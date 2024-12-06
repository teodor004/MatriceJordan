import axios from 'axios';

const fetchWorkouts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/workouts');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
};
