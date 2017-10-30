# Flight Stats App
  
  ## First Delivery
  This is the first delivery (in time) accordinly with the time estimate I provided.
  
  This content will be in a branch called 'first-delivery'
  
  ## This delivery contains
  - Full Architecture in AngularJS 1.6 ES6
  - A histogram of delays given origin and destination airports
  - A histogram of delay ratios given origin and destination airports
  - The overall ratio
  - Full Unit Test setup
  
  ## Run my code
  1. Clone this repo: `git clone https://github.com/Carniatto/flightStats.git`
  
  1. Enter the folder: `cd flightStats`
  
  1. Install dependencies: `npm install`
  
  1. Run the code: `npm start`
  
  ## Architectural decisions
  - Decided to follow the requirements instead of my proposal
  - I can suggest using a boxplot per weekday to show the delays in a more useful way
  - For better performance we should consider converting the CSV file to json
  - Used Chart.js for charts in cavas, I rather use D3 but with little time Chartjs 
  gave me what a needed in this challenge
  - For parsing I used Lodash, a functional library for parsing e filtering
  - The bonus Round was implemented but for this high volume of date was not smooth. 
  A better approach would include a backend doing all the heavy Lift
  
  ## Author
  ### **Mateus Carniatto**
  
  github: https://github.com/Carniatto
  
  codepen: https://codepen.io/Carniatto/
  
  LinkedIn: https://www.linkedin.com/in/carniatto/
