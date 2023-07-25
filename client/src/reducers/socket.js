export const socket =  (socket = {}, action) => {
    switch (action.type) {
        case 'INIT_SOCKET':
            const ws = new WebSocket('wss://serenity-peace-api.com:5000')
            ws.addEventListener('message',handleMessage)
            return {
                ws: ws,
            }
        case 'CREATE_POST':
        default:
          return socket;
      }
};

function handleMessage(e) {
    const messageData = JSON.parse(e.data)
    if ('online' in messageData) {
      return showOnlinePeople(messageData.online)
    }
  }

  function showOnlinePeople(peopleInArray) {
    const people = {};
    peopleInArray.forEach(({id,full_name}) => {
      people[id] = full_name
    })
    return people
  }

