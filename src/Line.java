import processing.core.PGraphics;

/**
 * Line
 */
public class Line extends Object {

  public Line(Vector pos1,Vector pos2, Addons[] addons, int color, boolean Static) {
    super(new Vector[] {pos1,pos2,new Vector(pos1.getX()+1,pos1.getY()+1),new Vector(pos2.getX()+1,pos2.getY()+1)}, addons, color, Static);
    
  }

  @Override
  public void draw(PGraphics grafics) {
      grafics.push();
      grafics.fill(color);
      grafics.beginShape();
      for(int i = 0; i < pos.length; i++) {
        grafics.vertex(pos[i].getX(), pos[i].getY());
      }
      grafics.endShape(Sketch.CLOSE);
      grafics.pop();
  }

    
}