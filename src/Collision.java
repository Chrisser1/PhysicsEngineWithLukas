import java.util.ArrayList;

public class Collision extends Addons {

  public void setup(Object host) {}

  public void tick(Object host,Object[] allObjects) {

    ArrayList<Object> otherObjects = new ArrayList<Object>();

    for(int i = 0; i < allObjects.length; i++) {
      if(allObjects[i] != host) {
        otherObjects.add(allObjects[i]);
      }
    }

    // Does not work couse Java funny
    // Object[] sorted = otherObjects.toArray();

    Object[] sorted = new Object[otherObjects.size()];
    for(int i = 0; i < otherObjects.size(); i++) {
      sorted[i] = otherObjects.get(i);
    }

    if(detectCollision(host,sorted)) {
      System.out.println("There is collision");
    } else {
      System.out.println("No collision");
    }
  }

  

  
  public static boolean detectCollision(Object host, Object[] otherObjects) {
    for(int current = 0; current < otherObjects.length; current++){
      if(otherObjects[current] instanceof Ball || host instanceof Ball) {
        if(otherObjects[current] instanceof Ball == true && (host instanceof Ball) == false) {
          return polyCircle(host,otherObjects[current]);
        } else if(otherObjects[current] instanceof Ball == false && (host instanceof Ball) == true) {
          return polyCircle(otherObjects[current],host);
        } else if(otherObjects[current] instanceof Ball == true && (host instanceof Ball) == true) {
          return circleCircle(otherObjects[current],host);
        }
      } else {
        return polyPoly(otherObjects[current],host);
      //   // get next vertex in list
      //   // if we've hit the end, wrap around to 0
      //   if (next == otherObjects.length) next = 0;
        
      //   // get point positions
      //   Vector[] vectorCurrentpoints = otherObjects[current].pos;
      //   Vector point1 = new Vector(vectorCurrentpoints[current].getX(), vectorCurrentpoints[current].getY());
      //   Vector point2 = new Vector(vectorCurrentpoints[next].getX(), vectorCurrentpoints[next].getY());

      //   // now we can use these two points (a line) to compare
      //   // to the other polygon's vertices using polyLine()
      //   boolean collision = polyLine(host, point1, point2);
      //   if (collision) return true;
      }
    }
    return false;
  }

private static boolean polyPoly(Object poly1, Object poly2) {
    Vector[] poly1Pos = poly1.pos;
    Vector[] poly2Pos = poly2.pos;
  // go through each of the vertices, plus the next
  // vertex in the list
  int next = 0;
  for (int current=0; current<poly1Pos.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == poly1Pos.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    Vector vc = poly1Pos[current];    // c for "current"
    Vector vn = poly1Pos[next];       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    boolean collision = polyLine(poly2, vc, vn);
    if (collision) return true;

    // optional: check if the 2nd polygon is INSIDE the first
    collision = polyPoint(poly1, poly2Pos[0]);
    if (collision) return true;
  }

  return false;
}

private static boolean polyPoint(Object poly, Vector point) {
  Vector[] vertices = poly.pos;

  boolean collision = false;
  
  // go through each of the vertices, plus the next
  // vertex in the list
  int next = 0;
  for (int current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    Vector vc = vertices[current];    // c for "current"
    Vector vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth

  boolean del1 = vc.getY() > point.getY() && vn.getY() < point.getY();
  boolean del2 = vc.getY() < point.getY() && vn.getY() > point.getY();
  boolean del3 = point.getX() < (vn.getX()-vc.getX())*(point.getY()-vc.getY()) / (vn.getY()-vc.getY())+vc.getX(); 

    if ((del1 || del2) && del3) {
            collision = true;
    }
  }
  return collision;
}


  private static boolean polyLine(Object poly, Vector point1, Vector point2) {
    Vector[] vertices = poly.pos;
    int next = 0;
    for (int current = 0; current<vertices.length; current++) {
      next = current + 1;
      if (next == vertices.length) next = 0;

      // do a Line/Line comparison
      // if true, return 'true' immediately and
      // stop testing (faster)
      boolean hit = lineLine(point1, point2, vertices[current], vertices[next]);
      if (hit) {
        return true;
      }
    }
    // never got a hit
    return false;
  }

  private static boolean lineLine(Vector point1, Vector point2, Vector point3, Vector point4) {
    // calculate the direction of the lines
    float uA = ((point4.getX()-point3.getX())*(point1.getY()-point3.getY()) - (point4.getY() - point3.getY())*(point1.getX()-point3.getX())) / ((point4.getY() - point3.getY())*(point2.getX()-point1.getX()) - (point4.getX()-point3.getX())*(point2.getY()-point1.getY()));
    float uB = ((point2.getX()-point1.getX())*(point1.getY()-point3.getY()) - (point2.getY()-point1.getY())*(point1.getX()-point3.getX())) / ((point4.getY()-point3.getY())*(point2.getX()-point1.getX()) - (point4.getX()-point3.getX())*(point2.getY()-point1.getY()));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }
  
  // Souce http://jeffreythompson.org/collision-detection/poly-circle.php
  private static boolean polyCircle(Object poly, Object circle) {
    Vector[] vertices = poly.pos;
    int next = 0;
    for (int current = 0; current<vertices.length; current++) {
      next = current+1;
      if(next == vertices.length) next = 0;

      Vector vc = vertices[current];
      Vector vn = vertices[next];
      boolean collision = lineCircle(vc,vn,circle);
      if(collision) return true;
    }

    boolean centerInside = polygonPoint(poly, circle.pos[0]);
    if (centerInside) return true;

    return false;
  }

  // Souce http://jeffreythompson.org/collision-detection/poly-circle.php
  private static boolean lineCircle( Vector pos1, Vector pos2,Object circle) {
    Vector circlePos = circle.pos[0];

    boolean inside1 = pointCircle(pos1, circle);
    boolean inside2 = pointCircle(pos2, circle);
    if(inside1 || inside2) return true;

    float len = dist(pos1,pos2);

    float dot = (((circlePos.getX() - pos1.getX())*(pos2.getX() - pos1.getX())) + ((circlePos.getY() - pos1.getY())*(pos2.getY() - pos1.getY()))) / (float) Math.pow(len, 2);

    float closestX = pos1.getX() + (dot * (pos2.getX() - pos1.getX()));
    float closestY = pos1.getY() + (dot * (pos2.getY() - pos1.getY()));

    boolean onSegment = linePoint(pos1,pos2,new Vector(closestX,closestY));
    if(!onSegment) return false;
  
    float distX = closestX - circlePos.getX();
    float distY = closestY - circlePos.getY();
    float distance = (float) Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= circle.radius) {
      return true;
    }
    return false;

  }

  private static boolean linePoint(Vector pos1, Vector pos2, Vector point) {
    float d1 = dist(point, pos1);
    float d2 = dist(point, pos2);
  
    float lineLen = dist(pos1,pos2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    float buffer = 0.1f;    // higher # = less accurate

    if(d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }

  private static boolean pointCircle(Vector point, Object circle) {
    float distX = point.getX() - circle.pos[0].getX();
    float distY = point.getY() - circle.pos[0].getY();
    float distance = (float) Math.sqrt((distX * distX) + (distY * distY));

    if(distance <= circle.radius) {
      return true;
    } else {
      return false;
    }
  }


  private static boolean polygonPoint(Object poly, Vector point) {
    Vector[] vertices = poly.pos;
  boolean collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  int next = 0;
  for (int current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    Vector vc = vertices[current];    // c for "current"
    Vector vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.getY() > point.getY() && vn.getY() < point.getY()) || (vc.getY() < point.getY() && vn.getX() > point.getY())) &&
        (point.getX() < (vn.getX()-vc.getX())*(point.getY()-vc.getY()) / (vn.getY()-vc.getY())+vc.getX())) {
            collision = !collision;
    }
  }
  return collision;
}

private static boolean circleCircle(Object circle1, Object circle2) {
  Vector circle1Pos = circle1.pos[0];
  Vector circle2Pos = circle2.pos[0];
  // get distance between the circle's centers
  // use the Pythagorean Theorem to compute the distance
  float distX = circle1Pos.getX() - circle2Pos.getX();
  float distY = circle1Pos.getY() - circle2Pos.getY();
  float distance = (float) Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the sum of the circle's
  // radii, the circles are touching!
  if (distance <= circle1.getRadius() + circle2.getRadius()) {
    return true;
  }
  return false;
}

  // Souce http://jeffreythompson.org/collision-detection/poly-circle.php
  private static float dist(Vector pos1, Vector pos2) {
    // return PApplet.dist(pos1.getX(), pos1.getY(), pos2.getX(), pos2.getY());
    double x = Math.pow((pos2.getX() - pos1.getX()),2);
    double y = Math.pow((pos2.getY() - pos1.getY()),2);
    return (float) Math.sqrt(x+y);
  }
}
