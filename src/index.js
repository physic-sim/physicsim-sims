import p5 from 'p5';
import page from 'page';

// import css
import './styles/styles.css'

// add additional control logic for the simulation
function loadSim(Sim, title) {
    p5.disableFriendlyErrors = true;

    // set header & tab title
    document.getElementById('header-title').innerHTML = title;
    document.getElementById('tab-title').innerHTML = `Physicsim (${title})`;

    const sketch = new Sim(
        document.getElementById('sketch'),
        document.getElementById('inputs-container'),
        document.getElementById('graphs-wrapper'),
        document.getElementById('ctrls--bottom'),
        document.getElementById('attr-wrapper')
    )

    let p = new p5((p) => {
        p.setup = () => sketch.setup(p);
        p.draw = () => sketch.draw(p);
        p.windowResized = () => sketch.handleResize(p)
    });
      
    // Panel selector
    
    document.getElementById('graphs-selector').addEventListener('click', () => {
    
    if (sketch.selected == 'graphs') {
        document.getElementById('graphs-wrapper').style.opacity = 0;
        document.getElementById('graphs-wrapper').style.zIndex = -1;
        document.getElementById('graphs-selector').classList.remove('btn-toggle--selected');
        sketch.selected = null;
    } else {
        document.getElementById('graphs-wrapper').style.opacity = 100;
        document.getElementById('graphs-wrapper').style.zIndex = 100;
        document.getElementById('inputs-wrapper').style.display = 'none';
        document.getElementById('graphs-selector').classList.add('btn-toggle--selected');
        document.getElementById('inputs-selector').classList.remove('btn-toggle--selected');
        sketch.selected = 'graphs'
    }
    })
    
    document.getElementById('inputs-selector').addEventListener('click', () => {
    
    if (sketch.selected == 'inputs') {
        document.getElementById('inputs-wrapper').style.display = 'none';
        document.getElementById('inputs-selector').classList.remove('btn-toggle--selected');
        sketch.selected = null;
    } else {
        document.getElementById('graphs-wrapper').style.opacity = 0;
        document.getElementById('graphs-wrapper').style.zIndex = -1;
        document.getElementById('inputs-wrapper').style.display = 'flex';
        document.getElementById('inputs-selector').classList.add('btn-toggle--selected');
        document.getElementById('graphs-selector').classList.remove('btn-toggle--selected');
        sketch.selected = 'inputs'
    }
    })
    
    // Prompt hider
    document.getElementById('hide-btn').addEventListener('click', () => {
    let header = document.getElementById('header-wrapper');
    let btn = document.getElementById('hide-btn');
    
    if (header.style.display == 'none') {
        header.style.display = 'block'
        btn.innerHTML = 'Hide';
    } else {
        header.style.display = 'none'
        btn.innerHTML = 'Show';
    }
    })
    
    // prevent rotate when over control or graphs
    document.getElementById('inputs-wrapper').addEventListener('mouseenter', () => {
        sketch.rotateControl = false;
    })
    
    document.getElementById('inputs-wrapper').addEventListener('mouseleave', () => {
        sketch.rotateControl = true;
    })
    
    document.getElementById('inputs-wrapper').addEventListener('scroll', () => {
        sketch.rotateControl = false;
    })
    
    document.getElementById('inputs-wrapper').addEventListener('scrollend', () => {
        sketch.rotateControl = true;
    })
    
    document.getElementById('graphs-wrapper').addEventListener('mouseenter', () => {
        sketch.rotateControl = false;
    })
    
    document.getElementById('graphs-wrapper').addEventListener('mouseleave', () => {
        sketch.rotateControl = true;
    })
    
    document.getElementById('graphs-wrapper').addEventListener('scroll', () => {
        sketch.rotateControl = false;
    })
    
    document.getElementById('graphs-wrapper').addEventListener('scrollend', () => {
        sketch.rotateControl = true;
    })
    
    setInterval(() => {
        document.getElementById('frame-rate').innerHTML = `${p.frameRate().toFixed(2)}/${p.getTargetFrameRate().toFixed(2)} fps`
    }, 1000)
}

// routing system
page('/collisions', () => {
    import ('./Simulations/CollisionsSimulation').then(module => {
        loadSim(module.default, 'Collisions');
    })
})

page('/circular-motion', () => {
    import ('./Simulations/CircularMotionSimulation').then(module => {
        loadSim(module.default, 'Circular Motion');
    })
})

page('/projectile-motion', () => {
    import ('./Simulations/ProjectileSimulation').then(module => {
        loadSim(module.default, 'Projectile Motion')
    })
})

page('*', () => {
    window.location.href = "https://www.physicsim.co.uk";
})

// start router
page();

