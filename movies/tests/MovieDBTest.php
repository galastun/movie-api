<?php
namespace brandon\ccb;

include_once 'utilities/MovieDbHelper.php';

class MockPDO {}

use PHPUnit\Framework\TestCase;

final class MovieDbHelperTest extends TestCase {
  protected $movieDb;
  protected $mockPdo;
  protected function setUp() {
    $this->mockPdo = $this->getMockBuilder(MockPDO::class)
      ->setMethods(['prepare', 'execute', 'fetchAll'])
      ->getMock();

    $this->mockPdo->method('prepare')->will($this->returnSelf());
    $this->mockPdo->method('fetchAll')->willReturn(array('mock' => array()));

    $this->movieDb = new MovieDbHelper($this->mockPdo, array(
      'category' => 'c.category',
      'rating' => 'f.rating',
    ));
  }

  /** @test */
  public function shouldGetMovieById(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array(':id' => '1'));

    $result = $this->movieDb->getMovieById('1');
    $this->assertEquals(array(
      'data' => array(
        'movies' => array(
          'mock' => array()
        )
      )
    ), $result);
  }

  /** @test */
  public function shouldGetActors(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array(':id' => '2'));

    $result = $this->movieDb->getMovieActors('2');
    $this->assertEquals(array(
      'data' => array(
        'actors' => array(
          'mock' => array()
        )
      )
    ), $result);
  }

  /** @test */
  public function shouldGetMovies(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array());

    $result = $this->movieDb->getMovies();
  }

  /** @test */
  public function shouldGetMoviesWithWhereClause(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('prepare')
      ->with($this->stringContains('c.category = ?'));
    
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array('sci-fi'));

    $result = $this->movieDb->getMovies(array('category' => 'sci-fi'));
  }

  /** @test */
  public function shouldGetMoviesWithNoWhereClause(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('prepare')
      ->with($this->logicalNot(
        $this->stringContains('c.category = ?'))
      );
         
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array());

    $result = $this->movieDb->getMovies(array('bad_value' => 'sci-fi'));
  }

  /** @test */
  public function shouldGetMoviesWithMultipleWhereClause(): void {
    $this->mockPdo
      ->expects($this->once())
      ->method('prepare')
      ->with($this->stringContains('c.category = ? AND f.rating'));
          
    $this->mockPdo
      ->expects($this->once())
      ->method('execute')
      ->with(array('sci-fi', 'G'));

    $result = $this->movieDb->getMovies(array(
      'category' => 'sci-fi',
      'rating' => 'G',
    ));
  }
}
?>
