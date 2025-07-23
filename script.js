// Page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    const pages = document.querySelectorAll('.page');
                
    // Set home as default page if not logged in
    let currentPage = 'login';
                        
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would validate and send to server
            navigateTo('home');
            // Clear form fields
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        });
    }
                        
    // Navigation function
    function navigateTo(pageId) {
    // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
                        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        currentPage = pageId;
                        
        // Update active nav link
        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');

        // Scroll to top
        window.scrollTo(0, 0);
    }
                
    // Add click event to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            navigateTo(pageId);
        });
    });
                
    // Image upload functionality for points page
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const submitBtn = document.getElementById('submit-btn');
                
    if (dropArea && fileInput && previewContainer && submitBtn) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
                
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
                
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
                
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
                
        function highlight() {
            dropArea.classList.add('border-green-500', 'bg-green-50');
        }
                        
        function unhighlight() {
            dropArea.classList.remove('border-green-500', 'bg-green-50');
        }
                
        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);
                    
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
                        
        // Handle clicked files
        dropArea.addEventListener('click', () => {
            fileInput.click();
        });
                        
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
                        
        function handleFiles(files) {
            previewContainer.innerHTML = '';
                        
            if (files.length > 5) {
                alert('You can upload a maximum of 5 files');
                return;
            }
                        
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                                
                if (!file.type.match('image.*')) {
                    continue;
                }
                                
                if (file.size > 5 * 1024 * 1024) {
                    alert(`File ${file.name} is too large (max 5MB)`);
                    continue;
                }
                                
                const reader = new FileReader();
                                        
                reader.onload = function(e) {
                    const preview = document.createElement('div');
                    preview.className = 'relative';
                                                
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'w-full h-32 object-cover rounded-lg';
                                                
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center';
                    removeBtn.innerHTML = '<i class="fas fa-times text-xs"></i>';
                    removeBtn.addEventListener('click', function() {
                        preview.remove();
                    });
                                                                
                    preview.appendChild(img);
                    preview.appendChild(removeBtn);
                    previewContainer.appendChild(preview);
                };
                                        
                reader.readAsDataURL(file);
            }
        }
                                
        // Submit button
        submitBtn.addEventListener('click', function() {
            if (previewContainer.children.length === 0) {
                alert('Please upload at least one image');
                return;
            }
                        
            // In a real app, you would send to server
            alert('Your images have been submitted for review! Points will be awarded within 48 hours.');
            previewContainer.innerHTML = '';
        });
    }
});