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
            handle
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

        // TODO: Implement platform-specific data fetching
        // For now, just update the lastFetched timestamp
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
