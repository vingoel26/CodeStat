const express = require('express');
const auth = require('../middleware/auth');
const PlatformAccount = require('../models/PlatformAccount');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/accounts
// @desc    Get all platform accounts for current user
// @access  Private
router.get('/', async (req, res) => {
    try {
        const accounts = await PlatformAccount.find({ user: req.user.id });
        res.json({
            success: true,
            data: accounts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/accounts
// @desc    Add a new platform account
// @access  Private
router.post('/', async (req, res) => {
    try {
        const { platform, handle } = req.body;

        // Validate platform
        const validPlatforms = ['codeforces', 'codechef', 'leetcode', 'atcoder'];
        if (!validPlatforms.includes(platform)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid platform. Must be one of: ' + validPlatforms.join(', ')
            });
        }

        // Validate handle with external API if it's Codeforces
        let platformData = {};
        if (platform === 'codeforces') {
            try {
                const userInfo = await require('../services/codeforces').getUserInfo(handle);
                // Store initial data in cachedData.profile
                platformData = {
                    cachedData: {
                        profile: {
                            rating: userInfo.rating,
                            rank: userInfo.rank,
                            maxRating: userInfo.maxRating,
                            avatar: userInfo.titlePhoto || userInfo.avatar,
                            friendOfCount: userInfo.friendOfCount,
                            contribution: userInfo.contribution
                        },
                        lastUpdated: new Date()
                    },
                    isVerified: true,
                    lastFetched: new Date()
                };
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid Codeforces handle: ${handle}`
                });
            }
        }

        // Check if account already exists for this user
        const existingAccount = await PlatformAccount.findOne({
            user: req.user.id,
            platform,
            handle
        });

        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: 'This account is already connected'
            });
        }

        // Create new account
        const account = await PlatformAccount.create({
            user: req.user.id,
            platform,
            handle,
            ...platformData
        });

        res.status(201).json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/accounts/:id
// @desc    Remove a platform account
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const account = await PlatformAccount.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        await account.deleteOne();

        res.json({
            success: true,
            message: 'Account removed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/accounts/:id/refresh
// @desc    Refresh data for a platform account
// @access  Private
router.post('/:id/refresh', async (req, res) => {
    try {
        const account = await PlatformAccount.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        // Fetch latest data if Codeforces
        if (account.platform === 'codeforces') {
            try {
                // Use getFullProfile to fetch info, rating history, and submission stats
                const fullProfile = await require('../services/codeforces').getFullProfile(account.handle);

                // Update account with new data in cachedData
                account.cachedData = {
                    profile: fullProfile.profile,
                    ratingHistory: fullProfile.ratingHistory,
                    stats: fullProfile.stats,
                    lastUpdated: new Date()
                };

                // Also update top-level fields for easy access/sorting if needed
                // (Optional, depending on schema, but good for consistency)
                account.isVerified = true;

            } catch (err) {
                console.error('Failed to refresh CF data:', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to fetch latest data from Codeforces'
                });
            }
        }

        account.lastFetched = new Date();
        await account.save();

        res.json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
