import java.util.ArrayList;

public class Collision extends Addons {

  public void setup(Object host) {}
  private static returnValuesForPolyCollision  data = null;

  @Deprecated
  public void tick(Object host,Object[] allObjects) {

    // ArrayList<Object> otherObjects = new ArrayList<Object>();

    // for(int i = 0; i < allObjects.length; i++) {
    //   if(allObjects[i] != host) {
    //     otherObjects.add(allObjects[i]);
    //   }
    // }

    // // Does not work couse Java funny
    // // Object[] sorted = otherObjects.toArray();

    // Object[] sorted = new Object[otherObjects.size()];
    // for(int i = 0; i < otherObjects.size(); i++) {
    //   sorted[i] = otherObjects.get(i);
    // }

    // if(detectCollision(host,sorted)) {
    //   System.out.println("There is collision");
    // } else {
    //   System.out.println("No collision");
    // }
  }

  public void updatePos(Object host) {
    ArrayList<Object> otherObjects = new ArrayList<Object>();

    for(int i = 0; i < Sketch.objects.length; i++) {
      if(Sketch.objects[i] != host) {
        otherObjects.add(Sketch.objects[i]);
      }
    }
    
    // Does not work couse Java funny
    // Object[] sorted = otherObjects.toArray();

    Object[] sorted = new Object[otherObjects.size()];
    for(int i = 0; i < otherObjects.size(); i++) {
      sorted[i] = otherObjects.get(i);
    }

    if(detectCollision(host,sorted)) {

      if(data != null) changeDirectionPolyPoly(data.vec1,data.vec2, data.object1);
      
      System.out.println("There is collision");
    } else {
      System.out.println("No collision");
    }
  };
  
  
  public static boolean detectCollision(Object host, Object[] otherObjects) {
    for(int current = 0; current < otherObjects.length; current++){
      if(otherObjects[current] instanceof Ball || host instanceof Ball) {
        if(otherObjects[current] instanceof Ball == true && (host instanceof Ball) == false) {
          return Collision_polyCircle(host,otherObjects[current]);
        } else if(otherObjects[current] instanceof Ball == false && (host instanceof Ball) == true) {
          return Collision_polyCircle(otherObjects[current],host);
        } else if(otherObjects[current] instanceof Ball == true && (host instanceof Ball) == true) {
          return Collision_circleCircle(otherObjects[current],host);
        }
      } else {
        var e =  Collision_polyPoly(otherObjects[current],host);
        if(e) {
          return true;
        }
      }
    }
    return false;
  }

private static boolean Collision_polyPoly(Object other, Object host) {
    Vector[] otherPos = other.pos;
    Vector[] hostPos = host.pos;
  // go through each of the vertices, plus the next
  // vertex in the list
  int next = 0;
  for (int current=0; current<otherPos.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == otherPos.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    Vector vc = otherPos[current];    // c for "current"
    Vector vn = otherPos[next];       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    boolean collision = Collision_polyLine(host, vc, vn, other);
    if (collision) return true;

    // // optional: check if the 2nd polygon is INSIDE the first
    // collision = Collision_polyPoint(other, hostPos[0]);
    // if (collision) return true;
  }

  return false;
}

private static boolean Collision_polyPoint(Object other, Vector host) {
  Vector[] vertices = other.pos;

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

  boolean del1 = vc.getY() > host.getY() && vn.getY() < host.getY();
  boolean del2 = vc.getY() < host.getY() && vn.getY() > host.getY();
  boolean del3 = host.getX() < (vn.getX()-vc.getX())*(host.getY()-vc.getY()) / (vn.getY()-vc.getY())+vc.getX(); 

    if ((del1 || del2) && del3) {
            collision = true;
    }
  }
  return collision;
}


  private static boolean Collision_polyLine(Object host, Vector point1, Vector point2, Object other) {
    Vector[] vertices = host.pos;
    int next = 0;
    for (int current = 0; current<vertices.length; current++) {
      next = current + 1;
      if (next == vertices.length) next = 0;

      // do a Line/Line comparison
      // if true, return 'true' immediately and
      // stop testing (faster)
      boolean hit = Collision_lineLine(point1, point2, vertices[current], vertices[next]);
      if (hit) {
        data = new returnValuesForPolyCollision(point1, point2, host);
        return true;
      }
    }
    // never got a hit
    return false;
  }


  private static void changeDirectionPolyPoly(Vector point1, Vector point2, Object host){
    
    

    // Evalf the normal vector of the line that the object hits
    float dy = point2.getY() - point1.getY();
    float dx = point2.getX() - point1.getX();
    Vector normal;
    if(dx/dy > 0){
      dx = -dx;
      dy = -dy;
    }
    normal = new Vector(dy, -dx);


    // // Evalf the angle between velocity and normal vector
    // float normalVec_velocityVec =  (float) Math.toDegrees(Math.acos(host.velocity.dotProduct(normal)/(host.velocity.length()*normal.length())));
    
    // // Evalf the rotation angle
    // float deltaAngel = (float) Math.toRadians(180-normalVec_velocityVec*2);
    // float cosTheta = (float) Math.cos(deltaAngel);
    // float sinTheta = (float)  Math.sin(deltaAngel);
    // float xPrime = host.velocity.getX() * cosTheta - host.velocity.getY() * sinTheta;
    // float yPrime = host.velocity.getX() * sinTheta + host.velocity.getY() * cosTheta;

    // // Change velocity
    // host.velocity = new Vector(xPrime,yPrime);
    // host.velocity.add(host.acceleration);

    // Another aproach : This is for the moment the bedst one
    // Get direction
    Vector direction = new Vector(host.velocity.getX()-2*host.velocity.dotProduct(normal)*normal.getX(),host.velocity.getY()-2*host.velocity.dotProduct(normal)*normal.getY());
    // Get lengt
    float diffLength = host.velocity.length()/direction.length();
    host.velocity =  direction.multiply(diffLength);
    host.velocity.add(host.acceleration);

}

  private static boolean Collision_lineLine(Vector point1, Vector point2, Vector point3, Vector point4) {
    // calculate the direction of the lines
    float uA = ((point4.getX()-point3.getX())*(point1.getY()-point3.getY()) - (point4.getY() - point3.getY())*(point1.getX()-point3.getX())) / ((point4.getY() - point3.getY())*(point2.getX()-point1.getX()) - (point4.getX()-point3.getX())*(point2.getY()-point1.getY()));
    float uB = ((point2.getX()-point1.getX())*(point1.getY()-point3.getY()) - (point2.getY()-point1.getY())*(point1.getX()-point3.getX())) / ((point4.getY()-point3.getY())*(point2.getX()-point1.getX()) - (point4.getX()-point3.getX())*(point2.getY()-point1.getY()));
    // if uA and uB are between 0-1, lines are colliding
    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
  }
  
  // Souce http://jeffreythompson.org/collision-detection/poly-circle.php
  private static boolean Collision_polyCircle(Object poly, Object circle) {
    Vector[] vertices = poly.pos;
    int next = 0;
    for (int current = 0; current<vertices.length; current++) {
      next = current+1;
      if(next == vertices.length) next = 0;

      Vector vc = vertices[current];
      Vector vn = vertices[next];
      boolean collision = Collision_lineCircle(vc,vn,circle);
      if(collision) return true;
    }

    boolean centerInside = Collision_polygonPoint(poly, circle.pos[0]);
    if (centerInside) return true;

    return false;
  }

  // Souce http://jeffreythompson.org/collision-detection/poly-circle.php
  private static boolean Collision_lineCircle( Vector pos1, Vector pos2,Object circle) {
    Vector circlePos = circle.pos[0];

    boolean inside1 = Collision_pointCircle(pos1, circle);
    boolean inside2 = Collision_pointCircle(pos2, circle);
    if(inside1 || inside2) return true;

    float len = dist(pos1,pos2);

    float dot = (((circlePos.getX() - pos1.getX())*(pos2.getX() - pos1.getX())) + ((circlePos.getY() - pos1.getY())*(pos2.getY() - pos1.getY()))) / (float) Math.pow(len, 2);

    float closestX = pos1.getX() + (dot * (pos2.getX() - pos1.getX()));
    float closestY = pos1.getY() + (dot * (pos2.getY() - pos1.getY()));

    boolean onSegment = Collision_linePoint(pos1,pos2,new Vector(closestX,closestY));
    if(!onSegment) return false;
  
    float distX = closestX - circlePos.getX();
    float distY = closestY - circlePos.getY();
    float distance = (float) Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= circle.radius) {
      // we evalf the normal vector of the line
      float dy = pos2.getY() - pos1.getY();
      float dx = pos2.getX() - pos1.getX();
      Vector normal = new Vector(-dy, dx);
      circle.acceleration = new Vector(normal);
    }
    return false;

  }

  private static boolean Collision_linePoint(Vector pos1, Vector pos2, Vector point) {
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

  private static boolean Collision_pointCircle(Vector point, Object circle) {
    float distX = point.getX() - circle.pos[0].getX();
    float distY = point.getY() - circle.pos[0].getY();
    float distance = (float) Math.sqrt((distX * distX) + (distY * distY));

    if(distance <= circle.radius) {
      return true;
    } else {
      return false;
    }
  }


  private static boolean Collision_polygonPoint(Object poly, Vector point) {
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

private static boolean Collision_circleCircle(Object circle1, Object circle2) {
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


  public static class returnValuesForPolyCollision {
    public Vector vec1;
    private Vector vec2;
    private Object object1;
    returnValuesForPolyCollision(Vector vec1, Vector vec2, Object object1) {
      this.vec1 = vec1;
      this.vec2 = vec2;
      this.object1 = object1;
    }
  }

}
