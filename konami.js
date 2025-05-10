document.addEventListener('DOMContentLoaded', function() {
  // Konami Code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiCodePosition = 0;

  console.log('Konami code ready - Enter ↑↑↓↓←→←→BA to activate hacker mode');

  // Check if hacker mode was previously activated
  if (localStorage.getItem('hackerMode') === 'true') {
    activateHackerMode();
  }

  // Listen for key presses
  document.addEventListener('keydown', function(e) {
    // Get the key that was pressed
    const key = e.key.toLowerCase();

    // Get the expected key from the Konami sequence
    const expectedKey = konamiCode[konamiCodePosition].toLowerCase();

    // Check if the key matches the expected key
    if (key === expectedKey) {
      // Move to the next key in the sequence
      konamiCodePosition++;
      
      // Show sequence progress effect
      flashKey(konamiCodePosition);

      // If the full sequence is entered
      if (konamiCodePosition === konamiCode.length) {
        // Toggle hacker mode with dramatic effect
        document.body.classList.contains('hacker-mode') ? deactivateHackerMode() : activateHackerMode();
        
        // Reset the position for future input
        konamiCodePosition = 0;
      }
    } else {
      // Reset the position if an incorrect key is pressed
      konamiCodePosition = 0;
    }
  });

  // Create sequence progress indicator
  function flashKey(position) {
    // Show a brief visual indicator
    const indicator = document.createElement('div');
    indicator.textContent = position;
    indicator.style.position = 'fixed';
    indicator.style.right = '20px';
    indicator.style.bottom = '20px';
    indicator.style.backgroundColor = 'rgba(0,0,0,0.7)';
    indicator.style.color = '#e91e63';
    indicator.style.padding = '10px';
    indicator.style.borderRadius = '50%';
    indicator.style.width = '20px';
    indicator.style.height = '20px';
    indicator.style.display = 'flex';
    indicator.style.justifyContent = 'center';
    indicator.style.alignItems = 'center';
    indicator.style.fontFamily = 'monospace';
    indicator.style.zIndex = '9999';
    indicator.style.boxShadow = '0 0 10px #e91e63';
    document.body.appendChild(indicator);
    
    // Animate and remove
    setTimeout(() => {
      indicator.style.transform = 'scale(1.5)';
      indicator.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(indicator);
      }, 300);
    }, 200);
  }

  // Activate hacker mode with dramatic effect
  function activateHackerMode() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.zIndex = '10000';
    overlay.style.transition = 'opacity 1.5s ease';
    document.body.appendChild(overlay);

    // Create hacker text effect
    const hackText = document.createElement('div');
    hackText.textContent = 'SYSTEM COMPROMISED';
    hackText.style.position = 'fixed';
    hackText.style.top = '50%';
    hackText.style.left = '50%';
    hackText.style.transform = 'translate(-50%, -50%)';
    hackText.style.color = '#00ff00';
    hackText.style.fontFamily = 'monospace';
    hackText.style.fontSize = '3rem';
    hackText.style.fontWeight = 'bold';
    hackText.style.textShadow = '0 0 10px #00ff00';
    hackText.style.zIndex = '10001';
    document.body.appendChild(hackText);

    // Play hacker sound
    playHackerSound();

    // Trigger glitch animation
    setTimeout(() => {
      hackText.style.animation = 'glitch 0.5s infinite';
      
      // Create glitch animation style
      const glitchStyle = document.createElement('style');
      glitchStyle.textContent = `
        @keyframes glitch {
          0% { transform: translate(-50%, -50%) skew(0deg); text-shadow: -2px 0 #ff00ff, 2px 2px #00ffff; }
          20% { transform: translate(-52%, -50%) skew(3deg); text-shadow: 3px 0 #ff00ff, -3px -2px #00ffff; }
          40% { transform: translate(-50%, -48%) skew(0deg); text-shadow: -2px 0 #ff00ff, 2px 2px #00ffff; }
          60% { transform: translate(-48%, -50%) skew(-3deg); text-shadow: 3px 0 #ff00ff, -3px -2px #00ffff; }
          80% { transform: translate(-50%, -52%) skew(0deg); text-shadow: -2px 0 #ff00ff, 2px 2px #00ffff; }
          100% { transform: translate(-50%, -50%) skew(0deg); text-shadow: -2px 0 #ff00ff, 2px 2px #00ffff; }
        }
      `;
      document.head.appendChild(glitchStyle);
    }, 500);

    // Finish transition after delay
    setTimeout(() => {
      // Add hacker mode class
      document.body.classList.add('hacker-mode');
      localStorage.setItem('hackerMode', 'true');
      
      // Fade out overlay and text
      overlay.style.opacity = '0';
      hackText.style.opacity = '0';
      
      // Remove overlay and text after fade
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.removeChild(hackText);
        
        // Show success message
        showHackerMessage('ACCESS GRANTED - HACKER MODE ENABLED');
      }, 1500);
    }, 2000);
  }

  // Deactivate hacker mode
  function deactivateHackerMode() {
    // Create transition effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '10000';
    overlay.style.transition = 'opacity 1.5s ease';
    document.body.appendChild(overlay);
    
    // Fade in overlay
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
    
    // Play exit sound
    playExitSound();
    
    // Remove hacker mode after transition
    setTimeout(() => {
      document.body.classList.remove('hacker-mode');
      localStorage.setItem('hackerMode', 'false');
      
      // Fade out overlay
      overlay.style.opacity = '0';
      
      // Remove overlay after fade
      setTimeout(() => {
        document.body.removeChild(overlay);
        showHackerMessage('SYSTEM RESTORED');
      }, 1500);
    }, 1000);
  }

  // Show hacker message
  function showHackerMessage(message) {
    let messageElement = document.getElementById('hacker-mode-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.id = 'hacker-mode-message';
      document.body.appendChild(messageElement);
    }
    
    // Set message with typewriter effect
    messageElement.innerHTML = '';
    messageElement.classList.add('show');
    
    // Typewriter effect
    let i = 0;
    const typeSpeed = 50; // ms per character
    
    function typeWriter() {
      if (i < message.length) {
        messageElement.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      }
    }
    
    typeWriter();
    
    // Hide after delay
    setTimeout(() => {
      messageElement.classList.remove('show');
    }, 4000);
  }

  // Play hacker sound effect
  function playHackerSound() {
    try {
      // Create audio context
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Deep bass impact
      const oscillator1 = audioCtx.createOscillator();
      const gainNode1 = audioCtx.createGain();
      
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(80, audioCtx.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 1.5);
      
      gainNode1.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
      
      oscillator1.connect(gainNode1);
      gainNode1.connect(audioCtx.destination);
      
      oscillator1.start();
      oscillator1.stop(audioCtx.currentTime + 1.5);
      
      // Digital beeps
      setTimeout(() => {
        const beepFrequencies = [1200, 800, 1400, 700, 1000];
        beepFrequencies.forEach((freq, i) => {
          setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'square';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
          }, i * 150);
        });
      }, 500);
    } catch(e) {
      console.error('Audio failed to play:', e);
    }
  }
  
  // Play exit sound
  function playExitSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Shutdown sound
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.8);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch(e) {
      console.error('Audio failed to play:', e);
    }
  }

  // Add interactive functionality to the Konami hint
  const konamiHint = document.querySelector('.konami-hint-fixed');
  if (konamiHint) {
    konamiHint.addEventListener('click', function() {
      const hintText = this.querySelector('.hint-text');
      if (window.getComputedStyle(hintText).display === 'inline') {
        hintText.style.display = 'none';
      } else {
        hintText.style.display = 'inline';
        hintText.style.opacity = '1';
      }
    });
  }
});
