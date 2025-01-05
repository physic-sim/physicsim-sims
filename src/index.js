import p5 from 'p5';
import page from 'page';

// import css
import './styles/styles.css';

// loading logic
let isLoading = true;
let loadingTexts = [
    'Setting quantum state...',
    'Accelerating protons!',
    'Diffracting light...',
    'Light: A wave or a particle?',
    'Checking conservation of momentum...',
    'Checking Newton\'s Laws...',
    'Reading up on Snell\'s Law...',
    'Correcting for parallax...',
];

function updateLoading(textElement) {
    // update loading text with a random statement from loadingTexts
    if (!isLoading) return;
    const randomIndex = Math.floor(Math.random() * loadingTexts.length);
    const text = loadingTexts[randomIndex];
    textElement.innerHTML = text;
    setTimeout(() => updateLoading(textElement), 500);
}

function stopLoading() {
    // close loading screen when triggered by setup() in sim
    if (!isLoading) return;
    isLoading = false;
    document.getElementById('body').firstElementChild.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingText = document.getElementById('loading-txt');
    updateLoading(loadingText);
});

// add additional control logic for the simulation
function loadSim(Sim, title, hasControls=true, hasGraphs=true) {
    // set header & tab title
    document.getElementById('header-title').innerHTML = title;
    document.getElementById('tab-title').innerHTML = `Physicsim (${title.split('(')[0].trim()})`;

    // init sketch
    const sketch = new Sim(
        document.getElementById('sketch'),
        document.getElementById('inputs-container'),
        document.getElementById('graphs-wrapper'),
        document.getElementById('ctrls--bottom'),
        document.getElementById('attr-wrapper')
    );

    let p = new p5((p) => {
        p.setup = () => sketch.setup(p, stopLoading);
        p.draw = () => sketch.draw(p);
        p.windowResized = () => sketch.handleResize(p);
    });

    // disable p5 error system
    p.disableFriendlyErrors = true;

    // panel selector
    document.getElementById('graphs-selector').addEventListener('click', () => {
        if (sketch.selected == 'graphs') {
            document.getElementById('graphs-wrapper').style.opacity = 0;
            document.getElementById('graphs-wrapper').style.zIndex = -1;
            document
                .getElementById('graphs-selector')
                .classList.remove('btn-toggle--selected');
            sketch.selected = null;
        } else {
            document.getElementById('graphs-wrapper').style.opacity = 100;
            document.getElementById('graphs-wrapper').style.zIndex = 100;
            document.getElementById('inputs-wrapper').style.display = 'none';
            document
                .getElementById('graphs-selector')
                .classList.add('btn-toggle--selected');
            document
                .getElementById('inputs-selector')
                .classList.remove('btn-toggle--selected');
            sketch.selected = 'graphs';
        }
    });

    document.getElementById('inputs-selector').addEventListener('click', () => {
        if (sketch.selected == 'inputs') {
            document.getElementById('inputs-wrapper').style.display = 'none';
            document
                .getElementById('inputs-selector')
                .classList.remove('btn-toggle--selected');
            sketch.selected = null;
        } else {
            document.getElementById('graphs-wrapper').style.opacity = 0;
            document.getElementById('graphs-wrapper').style.zIndex = -1;
            document.getElementById('inputs-wrapper').style.display = 'flex';
            document
                .getElementById('inputs-selector')
                .classList.add('btn-toggle--selected');
            document
                .getElementById('graphs-selector')
                .classList.remove('btn-toggle--selected');
            sketch.selected = 'inputs';
        }
    });

    // remove / add buttons based on sim settings
    if (hasControls == false) {
        document.getElementById('inputs-selector').style.display = 'none';
    }

    if (hasGraphs == false) {
        document.getElementById('graphs-selector').style.display = 'none';
    }

    // prompt hider
    document.getElementById('hide-btn').addEventListener('click', () => {
        let header = document.getElementById('header-wrapper');
        let btn = document.getElementById('hide-btn');

        if (header.style.display == 'none') {
            header.style.display = 'block';
            btn.src = './static/prompt-close.png';
        } else {
            header.style.display = 'none';
            btn.src = './static/prompt-open.png';
        }
    });

    // prevent rotate when over control or graphs
    document
        .getElementById('inputs-wrapper')
        .addEventListener('mouseenter', () => {
            sketch.rotateControl = false;
        });

    document
        .getElementById('inputs-wrapper')
        .addEventListener('mouseleave', () => {
            sketch.rotateControl = true;
        });

    document.getElementById('inputs-wrapper').addEventListener('scroll', () => {
        sketch.rotateControl = false;
    });

    document
        .getElementById('inputs-wrapper')
        .addEventListener('scrollend', () => {
            sketch.rotateControl = true;
        });

    document
        .getElementById('graphs-wrapper')
        .addEventListener('mouseenter', () => {
            sketch.rotateControl = false;
        });

    document
        .getElementById('graphs-wrapper')
        .addEventListener('mouseleave', () => {
            sketch.rotateControl = true;
        });

    document.getElementById('graphs-wrapper').addEventListener('scroll', () => {
        sketch.rotateControl = false;
    });

    document
        .getElementById('graphs-wrapper')
        .addEventListener('scrollend', () => {
            sketch.rotateControl = true;
        });
    
    // play / pause simulation based on visibility API
    document.addEventListener('visibilitychange', (e) => {
        if (document.visibilityState == 'visible') {
            sketch.togglePause(false);
        } else {
            sketch.togglePause(true);
        }
    })

    // update frame-rate
    setInterval(() => {
        document.getElementById('frame-rate').innerHTML =
            `${p.frameRate().toFixed(2)}/${p.getTargetFrameRate().toFixed(2)} fps`;
    }, 1000);
}

// routing system and chunk loading system
page('/collisions', () => {
    import('./Simulations/CollisionsSimulation').then((module) => {
        loadSim(module.default, 'Collisions');
    });
});

page('/circular-motion', () => {
    import('./Simulations/CircularMotionSimulation').then((module) => {
        loadSim(module.default, 'Circular Motion');
    });
});

page('/projectile-motion', () => {
    import('./Simulations/ProjectileSimulation').then((module) => {
        loadSim(module.default, 'Projectile Motion');
    });
});

page('/snells-law', () => {
    import('./Simulations/SnellsLawSimulation/SnellsLawSimulation').then(
        (module) => {
            loadSim(module.default, 'Snell\'s Law');
        },
    );
});

page('/cyclotron', () => {
    import('./Simulations/CyclotronSimulation').then((module) => {
        loadSim(module.default, 'Cyclotron (Non-Relativistic)');
    });
});

page('/alpha-scattering', () => {
    import('./Simulations/ScatteringSimulation').then((module) => {
        loadSim(module.default, 'Alpha Particle Scattering', true, false);
    });
})

page('*', () => {
    window.location.href = 'https://www.physicsim.co.uk';
});

// start router
page();
