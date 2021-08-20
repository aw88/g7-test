module.exports = {
  BASE_URL: process.env.BASE_URL || 'https://bpdts-test-app.herokuapp.com',
  DEFAULT_DISTANCE: 80000.0, // 80km ≈ 50 miles
  DEFAULT_CITY: 'London',
  CITIES: {
    London: { latitude: 51.507222, longitude: -0.1275 },
    Budapest: { latitude: 47.4925, longitude: 19.051389 },
  },
};
