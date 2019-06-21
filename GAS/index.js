/* eslint-disable */

function load() {
  const monitoringList = getEnv('monitoring_list');
  const config = getEnv('firebase_json');

  const firestore = FirestoreApp.getFirestore(
    config.client_email,
    config.private_key,
    config.project_id
  );

  try {
    var statuses = firestore.getDocuments('statuses');
    var status = statuses[0].fields;
  } catch (e) {
    firestore.createDocument('statuses/now', {});
  }

  for (var key in monitoringList) {
    const monitorResult = monitor(monitoringList[key].url);

    monitoringList[key].status = monitorResult;
    monitoringList[key].updated_at = Date.now();

    if (status && status[key] && status[key].status !== monitorResult) {
      integration(key, monitorResult);
    }
  }

  firestore.updateDocument('statuses/now', monitoringList);
}

function getEnv(name, no_json) {
  const d = PropertiesService.getScriptProperties().getProperty(name);
  return !no_json ? JSON.parse(d) : d;
}

function monitor(url) {
  try {
    UrlFetchApp.fetch(url);
    return true;
  } catch (e) {
    return false;
  }
}

function integration(name, status) {
  const discord = getEnv('discord_webhook', true);
  if (discord) {
    const option = {
      method: 'post',
      payload: {
        content:
          '[Monitor] **' +
          name +
          '** is ' +
          (status ? 'back online ✅' : 'down ‼️')
      }
    };
    UrlFetchApp.fetch(discord, option);
  }
}
