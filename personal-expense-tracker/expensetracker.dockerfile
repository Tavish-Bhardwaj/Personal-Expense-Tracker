#using the default node application
FROM node:18-alpine

#setting the working directory as the root
WORKDIR /app 

#copy package.json and package-lock.json
COPY package*.json ./

#install all the dependecies
RUN npm install

#copy rest of the application files
COPY . .

#run next application
RUN npm run build

#expose the port required
EXPOSE 3000

#Start the next application
CMD ["npm", "start"]
