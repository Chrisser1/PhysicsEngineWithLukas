import processing.core.PGraphics;

/**
 * Ball
 */
public class Ball extends Object {
  private int radius = 10;
  public double kineticEnergy = 1/2 * mass * Math.pow((velocity.sum()),2); 

    public Ball() { 
        super(new Addons[] {new Gravity()});
    }

    public void draw(PGraphics g) {
        g.ellipse((float)pos.getX(), (float)pos.getY(), (float)radius, (float)radius );
    }

    public void tick() {
        updatePos();
    }
    
}