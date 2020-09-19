const express = require('express');
const router = express.Router();


var http=require('http');  
var cheerio = require('cheerio');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/play', (req, res, next) => {
	console.log(req.query.url);
	res.render('play', {url: req.query.url});
});

router.get('/youku', (req, res, next) => {
	http.get('http://www.youku.com/',function(req,res){  
		var html='';  
		req.on('data',function(data){  
			html+=data;  
		});  
		req.on('end',function(){  
			filter(html);
		});  
	}); 

	function filter(html) {
		if(html) {
			var $ = cheerio.load(html);
			var box = $('#m_26674');
			var listData = [];

			box.find('.p-thumb').each(function(item) {
				var pic = $(this);
				var pic_href = pic.find('a').attr('href');
				var pic_img = pic.find('.quic').attr('alt');
				listData.push({
					pic_href: pic_href,
					pic_img: pic_img
				});
			});
			console.log(listData);
			res.json(listData);

		} else {
			console.log('无数据传入');
		}
	}
});

module.exports = router;