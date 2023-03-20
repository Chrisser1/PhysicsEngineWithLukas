import processing.core.PGraphics;

/**
 * Box
 */
public class Square extends Object{
  
  public Square(Vector pos1, Vector pos2,Vector pos3,Vector pos4, Addons[] addons, int color) {
    super(new Vector[] {pos1,pos2,pos3,pos4},addons);
    this.color = color;
  }

  public Square(Vector pos, int width, int height, Addons[] addons, int color) {
    super(new Vector[] {new Vector(pos.getX(),pos.getY()),new Vector(pos.getX() + width, pos.getY()),new Vector(pos.getX() + width, pos.getY() + height),new Vector(pos.getX(), pos.getY()+ height)},addons);
    this.color = color;
  }

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