AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 1,
          z: pos.z - 0.5,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "50",
        });

        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    var scene = document.querySelector("#scene");

    var element = e.detail.target.el;

    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("ogre")) {
      
      var countOgreEl = document.querySelector("#countOgre");
      var ogresFired = parseInt(countOgreEl.getAttribute("text").value);
      ogresFired -= 1;

      countOgreEl.setAttribute("text", {
        value: ogresFired
      });

      if (ogresFired === 0) {
        var txt = document.querySelector("#completed");
        txt.setAttribute("visible", true);       
        
      }
      scene.removeChild(elementHit);
    }

    element.removeEventListener("collide", this.removeBullet);
  
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

