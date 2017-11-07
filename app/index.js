/*
* @Author: mark
* @Date:   2017-11-07 10:46:14
* @Last Modified by:   mark
* @Last Modified time: 2017-11-07 17:33:44
*/

var generators = require('yeoman-generator');  
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.Base.extend({
	initializing: function(){
		console.log('react build your app')
	},

	prompting: function(){ //接受用户输入	
		var done = this.async(); //输入完之后
		this.log(yosay('Welcome to the use ' + chalk.red('react') + ' cli!'
        )); 

        this.name = path.basename(process.cwd());
        this.license = 'ISC';
        this.description = '';
        this.author = '';

       	var prompts = [
       		{
       			type: 'input',
       			name: 'name',
       			message: 'name of project',
       			default: this.name
       		},
       		{
       			type: 'input',
       			name: 'description',
       			message:'description:',
       			default: this.description
       		},
          {
            type: 'input',
            name: 'baseurl',
            message:'baseurl:(生产项目资源的绝对路径,必须)',
            default: this.baseurl
          },
       		{
       			type: 'list',
       			name: 'react',
       			message: 'which version of react',
       			choices: [
       				{
       					name: 'react@15.1.0',
       					value: '15.1.0'
       				},
       				{
       					name: 'react@16.0.0',
                        value: '15.6.0'
       				},
       				{
       					name: 'react@15.6.0',
                        value: '15.6.0'
       				}
       			]
       		},
       		{
       			type: 'list',
       			name: 'redux',
       			message: 'which version of redux',
       			choices: [
       				{
       					name: 'redux@3.7.2',
       					value: '3.7.2'
       				},
       				{
       					name: 'redux@3.7.1',
                        value: '3.7.1'
       				},
       				{
       					name: 'redux@3.7.0',
                        value: '3.7.0'
       				}
       			]
       		},
       		{
       			type: 'list',
       			name: 'router',
       			message: 'which version of react-router',
       			choices: [
       				{
       					name: 'react-router@2.8.1"',
       					value: '2.8.1'
       				},
       				{
       					name: 'react-router@4.2.0',
                        value: '4.2.0'
       				}
       			]
       		},
       		{
       			type:'input',
       			name: 'repo',
       			message: 'git repository:', 
       			default: this.repo
       		},
       		{
       			type: 'input',
                name: 'license',
                message: 'license:', 
                default: this.license
       		},
       		{
                type: 'input',
                name: 'author',
                message: 'author:', 
                default: this.author
            }
       	];

       	this.prompt(prompts, function(props){
       		this.name = props.name;
            this.pkgName = props.name;
            this.react = props.react;
            this.router = props.router;
            this.redux = props.redux;
            this.baseurl = props.baseurl;
            this.repo = props.repo;
            this.license = props.license;
            this.author = props.author;
            this.description = props.description;
            done();
       	}.bind(this))
	},

	writing: {
		app: function(){
			this.directory('src', 'src');
			this.template('_package.json', 'package.json'); 
			this.template('_server.js', 'server.js');  
			this.template('_webpack.config.js', 'webpack.config.js');
		}
	},

	install: function(){
		var done = this.async();
		this.spawnCommand('npm', ['install'])
			.on('exit', function (code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
	},

	end: function(){
		var done = this.async();
		this.spawnCommand('node', ['server.js'])
			.on('exit', function (code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
	}
})