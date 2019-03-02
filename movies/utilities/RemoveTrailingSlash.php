<?php
namespace brandon\ccb;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 *  Middleware for ensure there is no breaking with a trailing slash
 * 
 * @param {Request} $request Slim request object
 * @param {Response} $reponse Slim response object
 * @param {Function} $next For calling the next method
 */
class RemoveTrailingSlash {
  public function __invoke(Request $request, Response $response, callable $next) {
    $uri = $request->getUri();
    $path = $uri->getPath();
   
    if ($path != '/' && substr($path, -1) == '/') {
      $uri = $uri->withPath(substr($path, 0, -1));
      
      if($request->getMethod() == 'GET') {
        return $response->withRedirect((string)$uri, 301);
      }
      else {
        return $next($request->withUri($uri), $response);
      }
    }
  
    return $next($request, $response);
  }
}
?>
