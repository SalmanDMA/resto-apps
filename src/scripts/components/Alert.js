class CustomAlert extends HTMLElement {
  set alertData(alert) {
    console.log(alert, 'bos');

    this.innerHTML = `
       <div class="alert alert-${alert.type} ${alert.classes} fade-in" role="alert">
         ${alert.message}
         <button type="button" class="btn-close" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
     `;

    const alertElement = this.querySelector('.alert');
    setTimeout(() => {
      alertElement.classList.remove('fade-in');
      alertElement.classList.add('fade-out');
      setTimeout(() => this.remove(), 500);
    }, 3000);

    const btnClose = this.querySelector('.btn-close');
    btnClose.addEventListener('click', () => {
      setTimeout(() => {
        alertElement.classList.remove('fade-in');
        alertElement.classList.add('fade-out');
        setTimeout(() => this.remove(), 500);
      }, 3000);
    });
  }
}

customElements.define('custom-alert', CustomAlert);