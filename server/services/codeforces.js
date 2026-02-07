const NodeCache = require('node-cache');

// Cache with 5-minute TTL
const cache = new NodeCache({ stdTTL: 300 });

const CODEFORCES_API = 'https://codeforces.com/api';

/**
 * Fetch data from Codeforces API with caching
 */
async function fetchFromCF(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${CODEFORCES_API}${endpoint}${queryString ? '?' + queryString : ''}`;
    const cacheKey = url;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        return cached;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
        throw new Error(data.comment || 'Codeforces API error');
    }

    // Cache successful response
    cache.set(cacheKey, data.result);
    return data.result;
}

/**
 * Get user info (rating, rank, avatar, etc.)
 */
async function getUserInfo(handle) {
    const users = await fetchFromCF('/user.info', { handles: handle });
    return users[0];
}

/**
 * Get user rating history
 */
async function getRatingHistory(handle) {
    return await fetchFromCF('/user.rating', { handle });
}

/**
 * Get user submissions
 */
async function getSubmissions(handle, count = 1000) {
    return await fetchFromCF('/user.status', { handle, count });
}

/**
 * Process submissions to get problem statistics
 */
function processSubmissions(submissions) {
    const solvedProblems = new Set();
    const problemsByRating = {};
    const problemsByTag = {};
    const verdictCounts = {};
    const submissionsByDate = {};

    submissions.forEach((sub) => {
        // Count verdicts
        verdictCounts[sub.verdict] = (verdictCounts[sub.verdict] || 0) + 1;

        // Track submissions by date
        const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
        submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;

        // Only count accepted solutions for solved problems
        if (sub.verdict === 'OK') {
            const problemId = `${sub.problem.contestId}${sub.problem.index}`;

            if (!solvedProblems.has(problemId)) {
                solvedProblems.add(problemId);

                // Count by rating
                const rating = sub.problem.rating || 'unrated';
                problemsByRating[rating] = (problemsByRating[rating] || 0) + 1;

                // Count by tag
                (sub.problem.tags || []).forEach((tag) => {
                    problemsByTag[tag] = (problemsByTag[tag] || 0) + 1;
                });
            }
        }
    });

    return {
        totalSolved: solvedProblems.size,
        totalSubmissions: submissions.length,
        problemsByRating,
        problemsByTag,
        verdictCounts,
        submissionsByDate,
    };
}

/**
 * Get complete Codeforces profile data
 */
async function getFullProfile(handle) {
    try {
        const [userInfo, ratingHistory, submissions] = await Promise.all([
            getUserInfo(handle),
            getRatingHistory(handle),
            getSubmissions(handle),
        ]);

        const stats = processSubmissions(submissions);

        return {
            profile: {
                handle: userInfo.handle,
                rating: userInfo.rating,
                maxRating: userInfo.maxRating,
                rank: userInfo.rank,
                maxRank: userInfo.maxRank,
                avatar: userInfo.avatar || userInfo.titlePhoto,
                contribution: userInfo.contribution,
                friendOfCount: userInfo.friendOfCount,
                registrationTimeSeconds: userInfo.registrationTimeSeconds,
            },
            ratingHistory: ratingHistory.map((r) => ({
                contestId: r.contestId,
                contestName: r.contestName,
                rank: r.rank,
                oldRating: r.oldRating,
                newRating: r.newRating,
                date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString(),
            })),
            stats,
            lastUpdated: new Date().toISOString(),
        };
    } catch (error) {
        throw new Error(`Failed to fetch Codeforces data for ${handle}: ${error.message}`);
    }
}

module.exports = {
    getUserInfo,
    getRatingHistory,
    getSubmissions,
    processSubmissions,
    getFullProfile,
};
