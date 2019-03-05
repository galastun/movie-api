<?php
namespace brandon\ccb;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * Slim route controller for the Movies API.
 */
class RouteController {
  public function __construct($container) {
    $this->container = $container;
  }

  /**
   * Responsible for returning all movies or filtering based on the query string.
   * 
   * @param {Request} $request Slim request object
   * @param {Response} $reponse Slim response object
   * @return {HTTPResponse}
   */
  public function getMovies(Request $request, Response $response, array $args) {
    $db = $this->container->get('db');
    $queryParams = $request->getQueryParams();
    return $response->withJson($db->getMovies($queryParams));
  }

  /**
   * Responsible for returning a single movie by ID.
   * 
   * @param {Request} $request Slim request object
   * @param {Response} $reponse Slim response object
   * @return {HTTPResponse}
   */
  public function getMovieById(Request $request, Response $response, array $args) {
    $db = $this->container->get('db');
    return $response->withJson($db->getMovieById($args['id']));
  }

  /**
   * Responsible for returning all actors for a specific movie based
   * on the ID.
   * 
   * @param {Request} $request Slim request object
   * @param {Response} $reponse Slim response object
   * @return {HTTPResponse}
   */
  public function getActors(Request $request, Response $response, array $args) {
    $db = $this->container->get('db');
    return $response->withJson($db->getMovieActors($args['id']));
  }

  /**
   * Responsible for returning all categories.
   * 
   * @param {Request} $request Slim request object
   * @param {Response} $reponse Slim response object
   * @return {HTTPResponse}
   */
  public function getCategories(Request $request, Response $response, array $args) {
    $db = $this->container->get('db');
    return $response->withJson($db->getCategories());
  }
}
?>
