const express = require('express');
const app = express();

const ejs = require('ejs');



// 模板引擎
app.engine('html', ejs.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

// 静态目录
app.use(express.static('public'));


// 路由分模块
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// 404页面
app.get('*', function(req, res) {
	res.send('404 not found');
});

app.listen(3002, function() {
	console.log('3002 is listening...');
});
