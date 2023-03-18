/**
 * Gravity
 */
public class Gravity extends Addons{
  
  private final double Gravity = 9.82f;
  private double gravityForceX = 0;
  private double gravityForcey = 0.1f*Gravity;
  private Vector gravityForce; 

  public Gravity() {

  }
    public void setup(Object object) {
        gravityForce = new Vector(gravityForceX,gravityForcey);
        gravityForce.divide(object.mass);
        object.acceleratuion = new Vector(gravityForce);
    }

  public void tick() {

  }
}