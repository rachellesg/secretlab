# Secretlab Front End Task: Ecommerce Webstore

This is my submission for the Secretlab Front End Task. The task involves creating a front-end only application for an Ecommerce webstore. The application will allow users to browse and purchase products from the webstore. While I was able to complete most of the requirements, I faced challenges in implementing Jest testing with Zustand due to limited time and the complexity of the task. Given more time, I believe I can overcome these challenges and successfully implement the testing.

### 30 July 2023 - Additional requirements

- To save cart even after page refreshes
- To add testing for add to cart feature
- Optimize code using advanced Next.js techniques to handle traffic of 1 million views per second

### Limitations and work arounds

#### Cart persistence

Initially, I attempted to utilize local storage directly in the Cart component by incorporating it as a React state. However, I encountered an issue where the Cart reset whenever the page was refreshed due to server-side rendering. As the component is rendered on the server initially, local storage was not accessible, leading to a mismatch in the UI.

Subsequently, after conducting more research, I found that Zustand offers a Persist middleware, which facilitates the storage of state. This middleware allows for the persistence of the Cart state across page refreshes and resolves the problem I encountered earlier.

---

## Technologies Used

- Next.js
- Tailwind CSS
- TypeScript
- Zustand
- Jest

## Installation and Usage

To run the login component in a local development environment, follow these steps:

- Clone the repository: git clone <repository-url>
- Navigate to the project directory: cd secretlab
- Install the dependencies: npm install
- Start the development server: npm run dev
- Open a web browser and navigate to http://localhost:3000 to view the login component.

---

## Thought Process

While working on this application, I approached it with a focus on using modern tools and libraries to enhance the development process and improve the user interface. Here are the key steps I followed:

1. Familiarizing with Next.js and Tailwind CSS: As it was my first time working with Next.js and Tailwind CSS, I spent some time learning their core concepts and best practices. I leveraged my existing experience with React.js and other CSS libraries, which helped me quickly adapt to the new technologies.

2. Setting up the project: I created a Next.js project and configured the necessary dependencies, including Tailwind CSS for styling. I structured the application into different pages and components based on the desired functionality.

3. Fetching API data: To populate the product listing and product detail pages, I needed to fetch data from an API. I utilized the Fetch API to retrieve dummy product data and render it dynamically within the application. This allowed users to view and interact with the products.

4. Managing shared state: As the application grew, I encountered the need to share state across multiple components, particularly for managing the cart functionality. I decided to use Zustand, a state management library, to handle the state management seamlessly. Although I faced challenges in implementing Jest testing with Zustand, I believe with more time and effort, I can successfully integrate testing into the application.

## Limitations and Workarounds

During the development process, I encountered a few limitations and implemented workarounds to overcome them:

- API Data Limitations: As the application relies on a dummy product API, the data provided might not be exhaustive or reflect real-world scenarios. To mitigate this, I ensured that the application's design and functionality could accommodate a variety of product data structures and adapt to potential changes in the API response format.

- Learning Curve: While working with new technologies like Next.js, Zustand and JEST, there was a learning curve involved. However, I proactively sought documentation, tutorials, and examples to understand the concepts and best practices. This allowed me to efficiently utilize these technologies within the application and deliver a high-quality user experience.

Despite the challenges faced in implementing Jest testing with Zustand, I am confident in my ability to learn and adapt to new technologies given more time. This front-end application showcases my proficiency in building responsive user interfaces, handling API data, and managing shared state effectively. I'm excited to continue expanding my skills and contributing to front-end development projects.
