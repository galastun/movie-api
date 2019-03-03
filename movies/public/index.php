<?php
namespace brandon\ccb;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../utilities/MovieDbHelper.php';
require '../utilities/RemoveTrailingSlash.php';
require '../utilities/RouteController.php';

$app = new \Slim\App;
$container = $app->getContainer();

$container['RouteController'] = function($c) {
  return new RouteController($c);
};

$container['db'] = function($c) {
  $filterableValues = array(
    'category' => 'c.name',
    'rating' => 'f.rating',
    'title' => 'f.title',
  );

  $database = $username = $password = 'sakila';

  $host = "mysql";
  $db = new \PDO("mysql:host={$host};dbname={$database};charset=utf8", $username, $password);

  $database = new MovieDbHelper($db, $filterableValues);
  return $database;
};

$app->add(new RemoveTrailingSlash());
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/', function($request, $response, $args) {
  $file = 'index.html';
  if(file_exists($file)) {
    return $reponse->write(file_get_contents($file));
  } else {
    throw new \Slim\Exception\NotFoundException($request, $response);
  }
});

$app->group('/api/v1', function (\Slim\App $app) {
  $app->get('/movies', 'RouteController:getMovies');
  $app->get('/movies/{id}', 'RouteController:getMovieById');
  $app->get('/movies/{id}/actors', 'RouteController:getActors');
});

$app->run();
