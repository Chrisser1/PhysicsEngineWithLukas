import java.util.ArrayList;

/**
 * Objekt
 */
public class Object {
    protected Vector pos;
  
  protected Vector velocity;

  public final double mass = 10f;

  protected Vector acceleratuion;

  ArrayList<Addons> addons = new ArrayList<Addons>();

  public Object(Addons[] addons) {
      pos = new Vector(10, 10);
      velocity = new Vector(0f, 0f);
      acceleratuion = new Vector(0f,0f);
      for(int i = 0; i < addons.length; i++) {
        this.addons.add(addons[i]);
        this.addons.get(i).setup(this);
      }
  }
  
  public void tick() {
    for(int i = 0; i < addons.size(); i++) {
      this.addons.add(addons.get(i));
    }
  }

    protected void updatePos() {
        velocity.add(acceleratuion);
        pos.add(velocity);
        System.out.println(pos.getCoords());
    }


}