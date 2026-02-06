const mongoose = require('mongoose');

const platformAccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    platform: {
        type: String,
        required: true,
        enum: ['codeforces', 'codechef', 'leetcode', 'atcoder']
    },
    handle: {
        type: String,
        required: true,
        trim: true
    },
    // Cached data from API
    cachedData: {
        profile: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },
        stats: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },
        submissions: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },
        contests: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        }
    },
    lastFetched: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Compound index to ensure unique platform-handle per user
platformAccountSchema.index({ user: 1, platform: 1, handle: 1 }, { unique: true });

module.exports = mongoose.model('PlatformAccount', platformAccountSchema);
