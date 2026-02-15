document.addEventListener("DOMContentLoaded", function() {
    // Handling Nav 2 for mobile views
    const navV2MobileCloseBtn = document.getElementById('nav-v2-mobile-close-btn');
    const navV2Wrapper = document.querySelector('.nav-v2-wrapper');
    const mainLayoutColumns = document.querySelector('.ic-Layout-columns')

    if(navV2MobileCloseBtn && navV2Wrapper && mainLayoutColumns){
      navV2MobileCloseBtn.addEventListener('click', function() {
        navV2Wrapper.style.display = 'none';
        // mainLayoutColumns.setAttribute("style", "margin-left: 0px !important");
      })
    }

    // Nav v2 mobile hamburger handling
    const navV2MobileHamburger = document.getElementById('nav-v2-mobile-hamburger');

    if(navV2MobileHamburger && navV2Wrapper){
      navV2MobileHamburger.addEventListener('click', function() {
        navV2Wrapper.style.display = 'flex';
        // mainLayoutColumns.setAttribute("style", "margin-left: 0px !important");
      })
    }


    // Get the elements
    const activeTab = document.getElementById('active-tab');
    const completedTab = document.getElementById('completed-tab');
    const activeContent = document.getElementById('active-content');
    const completedContent = document.getElementById('completed-content');

    if(completedTab){
      completedContent.style.display = "none";
      completedTab.addEventListener('click', function() {
        // Switch active tab
        completedTab.classList.add('active');
        activeTab.classList.remove('active');
        // Show completed content
        activeContent.style.display = "none";
        completedContent.style.display = "block";
      });
    }

    if(activeTab){
      // Add click event listeners
      activeTab.addEventListener('click', function() {
        // Switch active tab
        activeTab.classList.add('active');
        completedTab.classList.remove('active');
        // Show active content
        activeContent.style.display = "block";
        completedContent.style.display = "none";
      });
    }
  });
  
  
document.querySelectorAll('.new-nav-wrapper .slim-version li').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const tooltip = item.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.left = `${item.getBoundingClientRect().right -35}px`;
            tooltip.style.top = `${item.getBoundingClientRect().top -10}px`;
        }
    });
});
   