// 导入WebSocket模块
const ws = require("ws");

// 引入Server类
const wsServer = ws.Server;

// 实例化
const wss = new wsServer({
    port: 3000
});

wss.on('connection', function(ws) {
    console.log('[SERVER] connection()');
    ws.on('message', message => {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, err => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});