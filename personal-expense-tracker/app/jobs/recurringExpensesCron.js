// // Added Cron file from chatGPT for now. Will modify it later to fit our needs.


// const cron = require('node-cron');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const dayjs = require('dayjs'); // A library to easily handle date calculations

// cron.schedule('0 0 * * *', async () => {  // Runs daily at midnight
//   console.log("Running cron job to handle recurring expenses...");
  
//   try {
//     // Fetch all recurring expenses
//     const recurringExpenses = await prisma.expense.findMany({
//       where: { recurring: true }
//     });

//     for (const expense of recurringExpenses) {
//       // Calculate the next occurrence based on the frequency
//       const lastRunDate = expense.lastRunDate || expense.date; // If `lastRunDate` is null, use the original date
//       let shouldCreateExpense = false;

//       // Determine if a new expense should be created based on the frequency
//       switch (expense.frequency) {
//         case 'daily':
//           shouldCreateExpense = dayjs().diff(lastRunDate, 'day') >= 1;
//           break;
//         case 'weekly':
//           shouldCreateExpense = dayjs().diff(lastRunDate, 'week') >= 1;
//           break;
//         case 'monthly':
//           shouldCreateExpense = dayjs().diff(lastRunDate, 'month') >= 1;
//           break;
//         case 'yearly':
//           shouldCreateExpense = dayjs().diff(lastRunDate, 'year') >= 1;
//           break;
//         default:
//           // Handle invalid or custom frequencies as needed
//           break;
//       }

//       // If it's time to create a new expense instance
//       if (shouldCreateExpense) {
//         // Create a new expense instance
//         await prisma.expense.create({
//           data: {
//             amount: expense.amount,
//             date: new Date(), // Set the current date as the expense date
//             recurring: expense.recurring,
//             frequency: expense.frequency,
//             categoryId: expense.categoryId,
//             userId: expense.userId,
//             lastRunDate: new Date(), // Set the lastRunDate to now
//           }
//         });

//         // Update the original expense's lastRunDate
//         await prisma.expense.update({
//           where: { id: expense.id },
//           data: {
//             lastRunDate: new Date()
//           }
//         });
//       }
//     }

//     console.log("Recurring expenses processed successfully.");
//   } catch (error) {
//     console.error("Error processing recurring expenses: ", error);
//   }
// });
