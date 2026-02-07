const express = require('express');
const codeforcesService = require('../services/codeforces');

const router = express.Router();

// @route   GET /api/platforms/codeforces/:handle
// @desc    Get Codeforces profile data
// @access  Public
router.get('/codeforces/:handle', async (req, res) => {
    try {
        const { handle } = req.params;
        const data = await codeforcesService.getFullProfile(handle);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 500).json({
            success: false,
            message: error.message,
        });
    }
});

// @route   GET /api/platforms/codeforces/:handle/info
// @desc    Get basic Codeforces user info
// @access  Public
router.get('/codeforces/:handle/info', async (req, res) => {
    try {
        const { handle } = req.params;
        const data = await codeforcesService.getUserInfo(handle);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// @route   GET /api/platforms/codeforces/:handle/rating
// @desc    Get Codeforces rating history
// @access  Public
router.get('/codeforces/:handle/rating', async (req, res) => {
    try {
        const { handle } = req.params;
        const data = await codeforcesService.getRatingHistory(handle);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Placeholder routes for other platforms
// @route   GET /api/platforms/:platform/:handle
// @desc    Get data for other platforms (placeholder)
// @access  Public
router.get('/:platform/:handle', async (req, res) => {
    const { platform, handle } = req.params;

    // Skip if already handled by specific routes
    if (platform === 'codeforces') {
        return res.status(400).json({
            success: false,
            message: 'Use /api/platforms/codeforces/:handle instead',
        });
    }

    // Validate platform
    const validPlatforms = ['codechef', 'leetcode', 'atcoder'];
    if (!validPlatforms.includes(platform)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid platform',
        });
    }

    // TODO: Implement other platform integrations
    res.json({
        success: true,
        data: {
            platform,
            handle,
            message: `${platform} integration coming soon`,
        },
    });
});

module.exports = router;
