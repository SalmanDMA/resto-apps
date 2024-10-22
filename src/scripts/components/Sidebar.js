class Sidebar extends HTMLElement {
 constructor() {
  super();
 }

 connectedCallback() {
  this.innerHTML = `
     <div class="sidebar-container">
       <button class="hamburger" id="hamburger" aria-label="Open Sidebar">&#9776;</button>
       <div class="sidebar" id="sidebar" role="navigation">
         <button class="close-btn" id="close-btn" aria-label="Close Sidebar">&times;</button>
         <div class="sidebar-brand">Resto Apps</div>
         <ul class="sidebar-links">
           <li><a href="/" aria-label="Go to Home">Home</a></li>
           <li><a href="#" aria-label="View Favorites">Favorite</a></li>
           <li>
             <a
               href="https://bit.ly/my-portofolio-salmandma"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="About Us"
               >About Us</a
             >
           </li>
         </ul>
       </div>
     </div>
   `;

  // Query elements within the shadow DOM
  const hamburger = this.querySelector('#hamburger');
  const sidebar = this.querySelector('#sidebar');
  const closeBtn = this.querySelector('#close-btn');
  const backdrop = document.querySelector('#backdrop');
  const body = document.body;

  const toggleSidebar = (show) => {
   if (show) {
    sidebar.classList.add('sidebar-active');
    backdrop.classList.add('backdrop-active');
    body.classList.add('overflow-hidden');
   } else {
    sidebar.classList.remove('sidebar-active');
    backdrop.classList.remove('backdrop-active');
    body.classList.remove('overflow-hidden');
   }
  };

  hamburger.addEventListener('click', () => {
   toggleSidebar(true);
  });

  closeBtn.addEventListener('click', () => {
   toggleSidebar(false);
  });

  backdrop.addEventListener('click', () => {
   toggleSidebar(false);
  });

  window.addEventListener('resize', () => {
   if (window.innerWidth > 768) {
    toggleSidebar(false);
   }
  });
 }
}

customElements.define('app-sidebar', Sidebar);
