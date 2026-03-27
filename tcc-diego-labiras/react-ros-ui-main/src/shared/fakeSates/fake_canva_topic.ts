  // Mock a big random JSON object for initial value
  export const mockBigJson = {
    id: Math.floor(Math.random() * 100000),
    name: "Robot_" + Math.random().toString(36).substring(2, 10),
    status: ["idle", "moving", "charging", "error"][
      Math.floor(Math.random() * 4)
    ],
    battery: {
      level: Math.floor(Math.random() * 100),
      voltage: (Math.random() * 20 + 10).toFixed(2),
      temperature: (Math.random() * 40 + 20).toFixed(1),
      health: ["good", "fair", "poor"][Math.floor(Math.random() * 3)],
      cycles: Math.floor(Math.random() * 500),
    },
    sensors: {
      lidar: {
        points: Array.from({ length: 10 }, () => ({
          x: +(Math.random() * 10).toFixed(2),
          y: +(Math.random() * 10).toFixed(2),
          intensity: +(Math.random() * 1).toFixed(2),
        })),
        status: ["ok", "faulty"][Math.floor(Math.random() * 2)],
      },
      camera: {
        resolution: "1920x1080",
        fps: Math.floor(Math.random() * 30 + 15),
        detectedObjects: Array.from({ length: 5 }, () => ({
          label: ["person", "chair", "table", "dog", "cat"][
            Math.floor(Math.random() * 5)
          ],
          confidence: +Math.random().toFixed(2),
          bbox: {
            x: Math.floor(Math.random() * 1920),
            y: Math.floor(Math.random() * 1080),
            w: Math.floor(Math.random() * 200 + 50),
            h: Math.floor(Math.random() * 200 + 50),
          },
        })),
      },
      bumpers: {
        left: Math.random() > 0.5,
        right: Math.random() > 0.5,
        front: Math.random() > 0.5,
        rear: Math.random() > 0.5,
      },
      cliff: {
        left: Math.random() > 0.5,
        right: Math.random() > 0.5,
        front: Math.random() > 0.5,
        rear: Math.random() > 0.5,
      },
    },
    location: {
      x: +(Math.random() * 100).toFixed(2),
      y: +(Math.random() * 100).toFixed(2),
      theta: +(Math.random() * Math.PI * 2).toFixed(3),
      map: "office",
    },
    logs: Array.from({ length: 10 }, (_, i) => ({
      timestamp: Date.now() - i * 1000 * 60,
      level: ["info", "warn", "error", "debug"][Math.floor(Math.random() * 4)],
      message: "Log message " + i,
    })),
    tasks: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      type: ["patrol", "delivery", "inspection"][Math.floor(Math.random() * 3)],
      status: ["pending", "in_progress", "done"][Math.floor(Math.random() * 3)],
      assignedTo: "Robot_" + Math.random().toString(36).substring(2, 8),
      startedAt: Date.now() - Math.floor(Math.random() * 1000000),
      finishedAt: Math.random() > 0.5 ? Date.now() : null,
    })),
    config: {
      maxSpeed: +(Math.random() * 2 + 0.5).toFixed(2),
      minSpeed: +(Math.random() * 0.5).toFixed(2),
      sensorsEnabled: {
        lidar: Math.random() > 0.2,
        camera: Math.random() > 0.2,
        bumpers: true,
        cliff: true,
      },
      firmwareVersion:
        "v" +
        (Math.floor(Math.random() * 3) + 1) +
        "." +
        Math.floor(Math.random() * 10),
    },
    meta: {
      createdBy: "admin",
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 100000000)
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      tags: Array.from({ length: 5 }, () =>
        Math.random().toString(36).substring(2, 8)
      ),
    },
  };