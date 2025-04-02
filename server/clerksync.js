const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./api/models/user'); 

const clerkApiKey = process.env.CLERK_API_KEY; 
const clerkApiBaseUrl = 'https://api.clerk.io/v1'; 

async function syncUsersWithClerk() {
  try {
    // Fetch users from Clerk 
    const response = await axios.get(`${clerkApiBaseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${clerkApiKey}`,
      },
    });

    const clerkUsers = response.data.data; 

  
    await Promise.all(
      clerkUsers.map(async (clerkUser) => {
        const existingUser = await User.findOne({ clerkUserId: clerkUser.id });

        if (existingUser) {
          
          existingUser.firstName = clerkUser.first_name;
          existingUser.lastName = clerkUser.last_name;
         
          await existingUser.save();
        } else {
          // Create new user
          await User.create({
            clerkUserId: clerkUser.id,
            firstName: clerkUser.first_name,
            lastName: clerkUser.last_name,
            
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