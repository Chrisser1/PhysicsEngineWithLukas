/**
 * Gravity
 */
public class Gravity extends Addons{
  
  private final float Gravity = 9.82f; // TODO should be 9.82
  private float gravityForceX = 0;
  private float gravityForcey = 0.1f*Gravity;
  private Vector gravityForce; 

  public void updatePos(Object host) {};

  public Gravity() {

  }
    public void setup(Object object) {
        gravityForce = new Vector(gravityForceX,gravityForcey);
        gravityForce.divide(object.mass);
        object.acceleratuion = new Vector(gravityForce);
    }
  
  public void tick(Object host, Object[] objects) {
  }
}