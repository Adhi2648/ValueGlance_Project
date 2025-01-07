# Financial Data App

This is a React app that fetches and displays financial data for a company (Apple) and allows users to filter and sort the data by different parameters.

## Features

- Fetch financial data from an API.
- Apply filters for date range, revenue, and net income.
- Sort data based on columns like date, revenue, and net income.
- Filter data on the server side through a Python backend (Flask).

## Instructions to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/financial-data-app.git
   cd financial-data-app
   ```

2. Install the required dependencies:

   - For the frontend (React):
     ```bash
     npm install
     ```
   - For the backend (Flask):
     ```bash
     pip install -r requirements.txt
     ```

3. Start the backend:

   ```bash
   python app.py
   ```

   This will start the Flask server on `http://localhost:5000`.

4. Start the frontend (React):

   ```bash
   npm start
   ```

   This will start the React development server on `http://localhost:3000`.

5. Open `http://localhost:3000` in your browser to view the app.

## Deployed App

The app is deployed and can be accessed at [your-deployed-app-link.com](http://your-deployed-app-link.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
