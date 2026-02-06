const express = require('express');

const router = express.Router();

// @route   GET /api/platforms/:platform/:handle
// @desc    Get data for a specific platform handle (public)
// @access  Public
router.get('/:platform/:handle', async (req, res) => {
    try {
        const { platform, handle } = req.params;

        // Validate platform
        const validPlatforms = ['codeforces', 'codechef', 'leetcode', 'atcoder'];
        if (!validPlatforms.includes(platform)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid platform'
            });
        }

        // TODO: Implement platform-specific data fetching
        // This is a placeholder response
        res.json({
            success: true,
            data: {
                platform,
                handle,
                message: 'Platform integration will be implemented in next steps'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
