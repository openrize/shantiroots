/**
 * ShantiRoots Toast Notification System
 * Replaces ALL browser alerts with premium toast notifications.
 */

(function() {
    function ensureContainer() {
        var container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            if (document.body) {
                document.body.appendChild(container);
            } else {
                document.addEventListener('DOMContentLoaded', function() {
                    document.body.appendChild(container);
                });
            }
        }
        return container;
    }

    /**
     * Show a custom toast notification
     * @param {string} message - The message to display
     * @param {string} type - 'success', 'info', or 'error' (default: 'success')
     * @param {number} duration - Duration in ms (default: 3500)
     */
    window.showToast = function(message, type, duration) {
        type = type || 'success';
        duration = duration || 3500;

        var container = ensureContainer();

        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.textContent = message;

        container.appendChild(toast);

        // Double rAF to ensure the browser has painted the initial state
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                toast.classList.add('show');
            });
        });

        // Auto-remove after duration
        setTimeout(function() {
            toast.classList.add('hide');
            toast.addEventListener('transitionend', function() {
                if (toast.parentNode) toast.remove();
            });
        }, duration);
    };

    // Override window.alert globally so ALL pages get toast notifications
    window.alert = function(message) {
        window.showToast(String(message), 'info');
    };

})();
