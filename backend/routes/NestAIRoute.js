const express = require("express");
const { getPersonalizedRecommendations } = require("../controller/NestAIController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// NEST-AI Routes
router.route("/nest-ai/recommendations").get(isAuthenticatedUser, getPersonalizedRecommendations);

module.exports = router;