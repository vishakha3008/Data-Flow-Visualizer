const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./api/models/user'); // Your user model

const clerkApiKey = process.env.CLERK_API_KEY; // Make sure to set this in your .env file
const clerkApiBaseUrl = 'https://api.clerk.io/v1'; // Replace with Clerk's API base URL

async function syncUsersWithClerk() {
  try {
    // Fetch users from Clerk API
    const response = await axios.get(`${clerkApiBaseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${clerkApiKey}`,
      },
    });

    const clerkUsers = response.data.data; // Assuming Clerk's API response structure

    // Update MongoDB with Clerk user data
    await Promise.all(
      clerkUsers.map(async (clerkUser) => {
        const existingUser = await User.findOne({ clerkUserId: clerkUser.id });

        if (existingUser) {
          // Update existing user
          existingUser.firstName = clerkUser.first_name;
          existingUser.lastName = clerkUser.last_name;
          // ... update other fields as needed
          await existingUser.save();
        } else {
          // Create new user
          await User.create({
            clerkUserId: clerkUser.id,
            firstName: clerkUser.first_name,
            lastName: clerkUser.last_name,
            // ... set other fields
          });
        }
      })
    );

    console.log('Users synced successfully');
  } catch (error) {
    console.error('Error syncing users:', error.message);
  }
}

module.exports = syncUsersWithClerk;