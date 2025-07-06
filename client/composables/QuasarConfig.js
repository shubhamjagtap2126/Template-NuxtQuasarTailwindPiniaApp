import { Loading, QSpinnerFacebook, Notify, LoadingBar } from 'quasar';

export function showLoading(message) {
  // QSpinnerAudio, QSpinnerBars , QSpinnerBars, QSpinnerBubbles, QSpinnerClocks, QSpinnerGears, QSpinnerHourglass, QSpinnerGrid, QSpinnerPuff,
  Loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: 'green',
    spinnerSize: '6em',
    backgroundColor: 'grey',
    message: `${message || 'Loading... Please wait!'}`,
    messageColor: 'black',
  });
}

export function hideLoading() {
  Loading.hide();
}

export function startLoadingBar() {
  LoadingBar.start({ color: 'green', size: '15px', position: 'top' });
}

export function stopLoadingBar() {
  LoadingBar.stop({ color: 'green', size: '15px', position: 'top' });
}
export function showNotify({ msg = 'Loading... Please wait!', color = 'positive' }) {
  Notify.create({
    message: `${msg}`,
    position: 'top-right',
    color: `${color}`,
    progress: true,
    actions: [{ icon: 'close', color: 'white', round: true, handler: () => {} }],
  });
}
