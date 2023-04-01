import processing.core.PGraphics;

/**
 * Ball
 */
public class Ball extends Object {
    public float kineticEnergy = 1/2 * mass * (float)Math.pow((velocity.sum()),2);


    public Ball(Vector pos,int radius, Addons[] addons, int color) {
        super(new Vector[] {pos}, addons, color);
        this.radius = radius;
    }



    public void draw(PGraphics grafics) {
        grafics.push();
        grafics.fill(color);
        grafics.ellipse((float)pos[0].getX(), (float)pos[0].getY(), (float) radius * 2, (float) radius * 2);
        grafics.pop();
    }
}