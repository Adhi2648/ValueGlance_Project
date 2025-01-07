from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

# Enable CORS for all domains
app = Flask(__name__)
CORS(app)


# API URL and key (replace with your actual API key)
API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual"
API_KEY = "7f0vCDfKGT1zEdhW0EQbM2FyD3q9m3t6"

# Fetch data from the API
def fetch_data():
    response = requests.get(f"{API_URL}&apikey={API_KEY}")
    if response.status_code == 200:
        return response.json()
    return []

# Filter data based on query params
def filter_data(data, date_range, revenue_range, net_income_range):
    filtered = []
    for item in data:
        date = int(item['calendarYear'])
        revenue = item['revenue']
        net_income = item['netIncome']

        if date_range[0] <= date <= date_range[1] and \
           revenue_range[0] <= revenue <= revenue_range[1] and \
           net_income_range[0] <= net_income <= net_income_range[1]:
            filtered.append(item)
    return filtered

# Sort data by a given field and order
def sort_data(data, sort_by, sort_order):
    return sorted(data, key=lambda x: x[sort_by], reverse=(sort_order == 'desc'))

@app.route('/get_financial_data', methods=['GET'])
def get_financial_data():
    # Fetch data
    data = fetch_data()

    # Get filters and sorting from query params
    date_range = [int(request.args.get('start_year', 2020)), int(request.args.get('end_year', 2024))]
    revenue_range = [int(request.args.get('min_revenue', 0)), int(request.args.get('max_revenue', 500000000000))]
    net_income_range = [int(request.args.get('min_net_income', 0)), int(request.args.get('max_net_income', 100000000000))]
    sort_by = request.args.get('sort_by', 'calendarYear')
    sort_order = request.args.get('sort_order', 'asc')

    # Filter and sort the data
    filtered_data = filter_data(data, date_range, revenue_range, net_income_range)
    sorted_data = sort_data(filtered_data, sort_by, sort_order)

    # Return the filtered and sorted data as JSON
    return jsonify(sorted_data)

if __name__ == '__main__':
    app.run(debug=True)
