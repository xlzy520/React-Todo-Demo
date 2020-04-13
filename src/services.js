const convertNetworkError = (err) => {
  return {
    code: 'NETWORK-ERROR',
    err
  };
};

const convertServiceError = (err) => Promise.reject(err);

const baseFetch = (url, options) => {
  return fetch(url, {
    ...options,
    headers: new Headers({
      'content-type': 'application/json',
    }),
  }).then(res => {
    return res.json()
  }).catch(convertNetworkError)
}

export const fetchLoginStatus = (username) => {
  return fetch('/session', {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogin = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({username: username}),
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then(response => {
      // this service has limited options in return data
      return response.ok;
    });
};

export const fetchTodoList = (username) => {
  return fetch(`/tasks/${username}`, {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchTheme = (username) => {
  return fetch(`/theme/${username}`, {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const updateTheme = (username, theme) => {
  return fetch(`/theme/${username}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({theme}),
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchAddTask = ({task}, username) => {
  // return baseFetch(`/tasks/${username}`, {
  //   method: 'POST',
  //   body:{ task: {task} },
  // })
  return fetch(`/tasks/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({task: {task}}),
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const removeTask = (username, taskId) => {
  return fetch(`/tasks/${username}/${taskId}`, {
    method: 'delete',
  }).then(response => response.json()).catch(convertNetworkError);
};

export const removeAllTask = (username) => {
  return fetch(`/tasks/${username}`, {
    method: 'delete',
  }).then(response => response.json()).catch(convertNetworkError);
};

export const updateTask = (username, task) => {
  console.log(username, task);
  return fetch(`/tasks/${username}/${task.taskId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({task}),
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        // This service happens to give error messages as JSON
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};
