// Generate a random string for dummy content
const gen = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
};

// assume have role developer or admin
const user = { email: 'dummy@gmail.com', username: 'dummy', password: 'dummy' };

const story = { title: 'Dummy Story' }

const task = { title: 'Dummy Task', content: 'Dummy Task Content' }

const timeline = { story: '6537de2359d29500e04e0e88' }

module.exports = { user, story, task, timeline, gen }