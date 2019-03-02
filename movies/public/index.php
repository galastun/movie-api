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

$app->group('/api/v1', function (\Slim\App $app) {
  $app->get('/movies', 'RouteController:getMovies');
  $app->get('/movies/{id}', 'RouteController:getMovieById');
  $app->get('/movies/{id}/actors', 'RouteController:getActors');
});

$app->run();
