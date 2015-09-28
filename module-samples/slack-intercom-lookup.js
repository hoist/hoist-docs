module.exports = function(event, done) {

  var email = extractEmails(event.payload.text);

  if(!email) {
    done();
    return;
  } else {
    email = email[0];
  }

  return Hoist.bucket.set('default')
    .then(function() {

      /* Get user from Intercom */
      return Hoist.connector('intercom').get('users', { 
        email: email
      }).catch(function(err) {
        return null;
      });

    })
  .then(function(user) {

    if(user) {
        
    Hoist.log(user);

      /* If a user was found, build the message block */
      return Hoist.connector('slack')
        .get('/chat.postMessage', formatMessage({
          channel_id: event.payload.channel_id,
          user: user, 
          email: email
        }));

    } else {

      /* If no user found, build an error block */
      return Hoist.connector('slack')
        .get('/chat.postMessage', formatMessage({
          channel_id: event.payload.channel_id
        }));

    }

  }).catch(function(err) {

    return Hoist.log(err.message);

  });

};

function extractEmails (text)
{
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}
function formatMessage(options) {

  /* This is the object that will be sent to Slack to create a message */
  /* Swap out the fields that you want to show */

  var fields = [];

  if(options.user) {
    if(options.user.session_count) {
      fields.push({
        title: 'Session Count',
        value: options.user.session_count,
        short: true
      });    
    }
    if(options.user.custom_attributes && options.user.custom_attributes.applications) {
      fields.push({
        title: 'Applications',
        value: options.user.custom_attributes.applications,
        short: true
      });    
    }
    if(options.user.location_data) {
      var loc = options.user.location_data.city_name ? options.user.location_data.city_name + ", " : "";
      loc += options.user.location_data.country_name ? options.user.location_data.country_name : "";
      fields.push({
        title: 'Location',
        value: loc,
        short: false
      });
    }
  }
  var message = {
    channel: options.channel_id,
    username: 'Hoist',
    icon_url: 'https://pbs.twimg.com/profile_images/514192322993471488/4cgcRw14_bigger.jpeg'
  };
  if(fields.length > 0) {
    message.attachments = JSON.stringify([
      {
        fallback: "User info for " + options.email,
        title: "User info for " + options.email,
        title_link: "https://app.intercom.io/apps/" + options.user.app_id + "/users/" + options.user.id,
        text: "Here's everything you need to know about " + options.user.name,
        fields: fields,
        color: "#13BCA4"
      }
    ])
  } else {
    message.text = "Sorry, user not found.";
  }
  return message;
}