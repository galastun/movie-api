<?php
namespace brandon\ccb;

class MovieDbHelper {
  private $db;
  private $movieQuery = '
    SELECT f.*, c.name as category from film_category as fc 
    INNER JOIN film as f ON fc.film_id = f.film_id
    INNER JOIN category as c ON fc.category_id = c.category_id
  ';
  private $filterAbleValues;

  public function __construct($db, $filterableValues) {
    $this->db = $db;
    $this->filterableValues = $filterableValues;
  }

  /**
   * Gets all movies from the database.
   * 
   * @param {String} $id The ID of the movie to get (default: null)
   * @return {Object}
   */
  public function getMovies($queryParams = array()) {
    $stmt = $this->buildMovieFindQuery($queryParams);

    return $this->wrapData('movies', $stmt->fetchAll(\PDO::FETCH_ASSOC));
  }

  /**
   * Gets a single movie from the database based on the ID
   * 
   * @param {String} $id The ID of the movie to get
   * @return {Object}
   */
  public function getMovieById($id) {
    $stmt = $this->db->prepare($this->movieQuery . "WHERE fc.film_id = :id");
    $stmt->execute([':id' => $id]);

    return $this->wrapData('movies', $stmt->fetchAll(\PDO::FETCH_ASSOC));
  }

  /**
   * Gets an array of actors based on movie ID.
   * 
   * @param {String} $id The movie ID
   * @return {Object}
   */
  public function getMovieActors($id) {
    $stmt = $this->db->prepare('
      SELECT fa.actor_id, a.first_name, a.last_name 
      from film_actor as fa 
      INNER JOIN actor as a ON fa.actor_id = a.actor_id WHERE fa.film_id = :id'
    );

    $stmt->execute([':id' => $id]);

    return $this->wrapData('actors', $stmt->fetchAll(\PDO::FETCH_ASSOC));
  }

  /**
   * Gets all categories used with the movies
   * 
   * @return {Object}
   */
  public function getCategories() {
    $stmt = $this->db->query('
      SELECT * FROM category
    ');

    return $this->wrapData('categories', $stmt->fetchAll(\PDO::FETCH_ASSOC));
  }

  /**
   * Wraps the response data in the Google JSON style guide recommended
   * structure with data on the outside. Defaults to an array of items
   * but that can be changed.
   * 
   * @param {String} $items The name of the array under the data object
   * @param {Object} $data The data to wrap
   * @return {Object}
   */
  private function wrapData($items = 'items', $data) {
    return array('data' => array($items => $data));
  }

  /**
   * Builds the query based on acceptable filter values and then
   * binds the parameters to the query. It will filter out 
   * all unacceptable values and continue to parse the acceptable ones.
   * 
   * @param {Object} $queryParams The query parameters from the HTTP request
   * @return {Object}
   */
  private function buildMovieFindQuery($queryParams) {
    $orderQuery = 'ORDER BY f.film_id';
    $whereQuery = '';
    $whereArray = array();

    $queryParams = array_filter($queryParams, function($key) {
      return array_key_exists($key, $this->filterableValues);
    }, ARRAY_FILTER_USE_KEY);

    foreach (array_keys($queryParams) as $key) {
        array_push($whereArray, "{$this->filterableValues[$key]} = ?");
    }

    if (sizeof($whereArray) > 0) {
      $whereQuery = 'WHERE ' . join(' AND ', $whereArray);
    }

    $stmt = $this->db->prepare(join(' ', array(
      $this->movieQuery, $whereQuery, $orderQuery)
    ));

    $stmt->execute(array_values($queryParams));

    return $stmt;
  }
}
?>
