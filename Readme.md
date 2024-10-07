# Section B: Short Answer Questions

### 6. Explain the Purpose of `express.Router()` in the Code Above.

`express.Router()` is used to create modular and mountable route handlers in an Express.js application. It improves code structure, readability, and maintainability by allowing developers to organize routes in separate files. This makes the codebase more modular, easier to manage, and promotes reusability.

### 7. Error Handling in Express.js

Error handling ensures the app gracefully handles any issues, like missing files or server errors. In Express.js, error-handling middleware catches errors and sends appropriate responses to the client. Example:

```javascript
app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});
