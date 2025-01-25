# Delivery Order Price Calculator UI (DOPC)

## 1. Introduction
This project is a submission for the **Wolt Frontend Internship 2025**. This Delivery Order Price Calculator (DOPC) is an imaginary frontend that is capable of calculating the total price and price breakdown of a delivery order.

DOPC integrates with the Home Assignment API to fetch venue-related data required to calculate the prices. The term venue refers to any kind of restaurant/shop/store in Wolt.

## 2. Features
- **Delivery Fee Calculation**: Calculates fees based on cart value, distance ranges, and venue-specific rules.
- **Geolocation**: Uses `navigator.geolocation` to obtain the user’s latitude and longitude, with error handling for denied permissions, timeouts, or unavailable positions.
- **Input Validation**: Ensures valid numeric input for cart value and latitude/longitude inputs.
- **Error Messages**: Displays detailed error messages when input fails validation.

## 3. Technology
- **React (TypeScript)** for building the user interface.
- **CSS** for styling the form and error messages.
- **Vitest / React Testing Library**for unit and integration tests.
  
## 4. Installation & Setup
1. **Clone this repository**:
    ```bash
    git clone https://github.com/username/frontend-internship-2025.git
    cd wolt-2025
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the development server**:
    ```bash
    npm run dev
    ```

## 5. Usage
1. **Venue Slug**: Enter the slug corresponding to a specific venue (used to fetch venue data like base price or distance ranges).
2. **Cart Value**: Enter a positive numeric value.
3. **Coordinates**: Either manually type latitude and longitude or click **Get Location** to use your device’s geolocation.
4. **Calculate Delivery Price**: Submit the form and display the calculated delivery fee.

## 6. Implementation Details
### Delivery Fee Calculation
- Located in a utility function (e.g., `calculateFee.ts`).
- Considers minimum cart value, distance brackets, and a base price.
- Returns a detailed object with the final fee and breakdown information.

### Error Handling & Validation
- **Cart Value** must be a valid number greater than 0.
- **Slug** must be provided; an error appears if the venue data cannot be fetched.
- **Coordinates** can be manually entered or retrieved via geolocation. Missing or invalid values produce an error message.

## 7. Testing
Tests are included:

```bash
npm run test
```

## 8. Conclusion
I've known since before I started my software development studies at Hive that I want to build frontends, even though I haven't been able to dedicate as much time as I've wanted to study React & TypeScript due to my busy study schedule. Now that my studies are nearing the end, I'm really happy that I finally got the opportunity to spend these two weeks on the DOPC - this project proved to be a lot of fun and full of learning! It made me sure that these are the technologies I want to work with. It was not an easy two weeks; the last proper projects I worked on with React were from over a year ago. If I had more time, I would love to work on cleaning my code, making it more efficient, and spend more time on CSS and designing an even better interface. Thinking about error handling was also a fun part to me. When to display an error, should it be when it was submitted or when the wrong value was input? What could be the most efficient logic and at the same time less stressful for users? I wish I could still play around to find out the best solution! Overall, I am satisfied with what I could learn from the assignment and I am excited to dive into it deeper!


