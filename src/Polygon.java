import processing.core.PGraphics;

public class Polygon extends Object {

    public Polygon(Vector[] pos, Addons[] addons, int color, boolean Static) {
        super(pos, addons, color,Static);
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